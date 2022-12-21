package com.chatapp.rest;

import com.chatapp.dto.CustomUserDetails;
import com.chatapp.dto.KeyAndPasswordDto;
import com.chatapp.dto.UserDto;
import com.chatapp.entity.Follow;
import com.chatapp.entity.User;
import com.chatapp.jwt.JwtTokenProvider;
import com.chatapp.repository.FollowRepository;
import com.chatapp.repository.UserRepository;
import com.chatapp.service.MailService;
import com.chatapp.service.PasswordHash;
import com.chatapp.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserResource {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private final MailService mailService;

    private final FollowRepository followRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody User user) throws URISyntaxException {
        Optional<User> users = userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        System.out.println(users);
        if(users.isPresent() == false){
            return ResponseEntity.status(401)
                    .body(null);
        }
        CustomUserDetails customUserDetails = new CustomUserDetails(users.get());
        String token = jwtTokenProvider.generateToken(customUserDetails);
        return ResponseEntity
                .created(new URI("/api/authen/" ))
                .body(token);
    }

    public UserResource(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, UserService userService, MailService mailService, FollowRepository followRepository) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.mailService = mailService;
        this.followRepository = followRepository;
    }
    @GetMapping("/getall")
    public Page<User> activateAccount(Pageable pageable) {
        return userRepository.findAll(pageable);
    }



    @PostMapping("/register")
    public ResponseEntity<Integer> save(@RequestBody User user) throws URISyntaxException {
        if(userService.checkEmailexist(user.getEmail())){
            HttpHeaders headers = new HttpHeaders();
            headers.add("email already exist ", user.getEmail());
            return ResponseEntity.status(300).headers(headers)
                    .body(1);
        }
        else if(userRepository.findByUsername(user.getUsername()).isPresent() == true){
            HttpHeaders headers = new HttpHeaders();
            return ResponseEntity.status(500).headers(headers)
                    .body(2);
        }
        User result = userService.save(user);
        System.out.println(result);
        mailService.sendEmail(user.getEmail(), "Active Your email vnua","copy this code to active page: "+result.getActivation_key(),false, false);
        return ResponseEntity
                .created(new URI("/api/save/" + result.getId()))
                .body(0);
    }

    @PostMapping("/updateUser")
    public ResponseEntity<Integer> update(@RequestBody User user) throws URISyntaxException {
        User u = userService.getUserWithAuthority();
        if(u.getId() != user.getId()){
            return ResponseEntity.status(500).body(0);
        }
        u.setEmail(user.getEmail());
        u.setAvatar(user.getAvatar());
        User result = userRepository.save(u);
        System.out.println(result);
        return ResponseEntity.status(200).body(1);
    }


    @PostMapping("/userlogged")
    public UserDto getUserLogged(){
        return new UserDto(userService.getUserWithAuthority());
    }

    @PostMapping("/confirm-regis")
    public void confirmRegis(@RequestParam("key") String key) throws Exception {
        Optional<User> user = userRepository.getUserByActivationKey(key);
        if(user.isPresent() == false){
            throw new Exception("No user was found for this activation key");
        }
        else{
            user.get().setActivation_key(null);
            user.get().setActived(1);
            userService.update(user.get());
        }
    }

    @PostMapping("/resetpass-init")
    public ResponseEntity<String> resetPassword(@RequestBody String email) throws URISyntaxException {
        Optional<User> user = userRepository.getUserByEmail(email);
        if(user.isPresent() == false){
            return ResponseEntity.status(500)
                    .body("this email not exist");
        }
        else{
            String remember_key = userService.randomKey();
            User users = user.get();
            users.setRemember_key(remember_key);
            userService.update(users);
            mailService.sendEmail(email,"resetmail","sử dụng key sau để đặt lại mật khẩu của bạn:"+remember_key,false, false);
        }
        return ResponseEntity.status(200)
                .body("check your email");
    }

    @PostMapping("/resetpass-finish")
    public ResponseEntity<String> finisRememberPassword(@RequestBody KeyAndPasswordDto keyAndPasswordDto){
        Optional<User> user = userRepository.getUserByRememberKey(keyAndPasswordDto.getKey());
        if(user.isPresent() == false){
            return ResponseEntity.status(500)
                    .body("key wrong! please check your email");
        }
        else{
            user.get().setRemember_key(null);
            user.get().setPassword(PasswordHash.passwordHash(keyAndPasswordDto.getNewPassword()));
            userService.update(user.get());
        }
        return ResponseEntity.status(200)
                .body("change password successful!");
    }

    @GetMapping("/admin/getUserNotAdmin")
    public Page<User> getUserNotAdmin(Pageable pageable) {
        return userRepository.findUserNotAdmin("ROLE_ADMIN",pageable);
    }

    @PostMapping("/admin/activeUser")
    public void activeOrUnactiveUser(@RequestParam("id") Long id){
        User user = userRepository.findById(id).get();
        if(user.getActived() == 1){
            user.setActived(0);
        }
        else{
            user.setActived(1);
        }
        userRepository.save(user);
    }

    @GetMapping("/public/findUserById")
    public UserDto findById(@RequestParam("id") Long id) {
        return new UserDto(userRepository.findById(id).get());
    }

    @GetMapping("/public/findUserNotDtoById")
    public User findUserById(@RequestParam("id") Long id) {
        return userRepository.findById(id).get();
    }

    @GetMapping("/admin/totalUsers")
    public Long totalUser(){
        return userRepository.getTotalUser();
    }

    @GetMapping("/admin/calUserSixMonth")
    public List<String> getUserSixMonth(){
        List<String> list = new ArrayList<>();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String currunYear = timestamp.toString().split(" ")[0].split("-")[0];
        String currunMonth = timestamp.toString().split(" ")[0].split("-")[1];
        System.out.println("--- month: "+currunMonth);
        System.out.println("--- year: "+currunYear);
        Integer month = Integer.valueOf(currunMonth);
        Integer year = Integer.valueOf(currunYear);
        for(int i =0; i< 6; i++){
            Long numUser = userRepository.getNumberUserOnAMonth(month,year);
            if (numUser == null){
                numUser = 0L;
            }
            String str = month.toString()+","+numUser.toString();
            list.add(str);
            --month;
            if(month == 0){
                month = 12;
                --year;
            }
        }
        return list;
    }

    @GetMapping("/user/dschuaketban")
    public List<User> dschuaketban(){
        User user = userService.getUserWithAuthority();
        List<User> full = userRepository.findAll();
        List<Follow> follows = followRepository.listUserDakb(user.getId());
        Set<User> set = new HashSet<>();
        for(Follow f : follows){
            if(f.getFollowers().getId() != user.getId()){
                set.add(f.getFollowers());
            }
            else if(f.getMe().getId() != user.getId()){
                set.add(f.getMe());
            }
        }
        for(int i=0; i< full.size(); i++){
            for(User u : set){
                if(full.get(i).getId() == u.getId()){
                    full.remove(i);
                    --i;
                    break;
                }
            }
        }
        for(User u : full){
            if(u.getId() == user.getId()){
                full.remove(u);
                break;
            }
        }
        return full;
    }

    @GetMapping("/user/dsdaketban")
    public Set<User> dsDaketban(){
        User user = userService.getUserWithAuthority();
        List<Follow> follows = followRepository.listUserDakb(user.getId());
        Set<User> set = new HashSet<>();
        for(int i=0; i<follows.size(); i++){
            if(follows.get(i).getFollowers().getId() != user.getId()){
                set.add(follows.get(i).getFollowers());
            }
            else if(follows.get(i).getMe().getId() != user.getId()){
                set.add(follows.get(i).getMe());
            }
        }
        return set;
    }

    @GetMapping("/user/follows")
    public void follows(@RequestParam("id") Long id){
        User fol = userRepository.findById(id).get();
        User me = userService.getUserWithAuthority();
        Follow f = followRepository.findByAnotherId(id, userService.getUserWithAuthority().getId());
        if(f != null){
            return;
        }
        Follow follow = new Follow();
        follow.setFollowers(me);
        follow.setMe(fol);
        followRepository.save(follow);
    }

    @GetMapping("/user/unfollows")
    public void unfollows(@RequestParam("id") Long id){
        Follow f = followRepository.findByAnotherId(id, userService.getUserWithAuthority().getId());
        followRepository.deleteById(f.getId());
    }


}
