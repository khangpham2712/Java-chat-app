package com.chatapp.rest;

import com.chatapp.entity.User;
import com.chatapp.entity.Follow;
import com.chatapp.repository.FollowRepository;
import com.chatapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FollowResource {

    private final FollowRepository followRepository;
    private final UserService userService;

    public FollowResource(FollowRepository followRepository, UserService userService) {
        this.followRepository = followRepository;
        this.userService = userService;
    }

    @PostMapping("/user/follows")
    public ResponseEntity<Follow> save(@RequestBody Follow follow){
        User user = userService.getUserWithAuthority();
        follow.setFollowers(user);
        Follow result = followRepository.save(follow);
        return ResponseEntity.ok(result);
    }

    // lay nghung nguoi dang theo doi minh
    @GetMapping("/user/followMe")
    public List<Follow> findByMyId(){
        User user = userService.getUserWithAuthority();
        return followRepository.findByMyId(user.getId());
    }

    // lay 1 nguoi dang duoc nhung nguoi khac theo doi
    @GetMapping("/public/followOfAnotherPeople")
    public List<Follow> findAnotherId(@RequestParam("id") Long id){
        return followRepository.findByMyId(id);
    }

    // nhung nguoi minh dang theo doi
    @GetMapping("/user/followOfMe")
    public List<Follow> followOfMe(){
        User user = userService.getUserWithAuthority();
        return followRepository.followOfMe(user.getId());
    }

    // nhung nguoi ai do dang theo doi
    @GetMapping("/public/followOfAnother")
    public List<Follow> followOfAnother(@RequestParam("id") Long id){
        return followRepository.followOfMe(id);
    }

    @DeleteMapping("/user/unfollow")
    public void unFollow(@RequestParam("id") Long id){
        followRepository.deleteById(id);
    }



}
