package com.chatapp.rest;

import com.chatapp.entity.Chatting;
import com.chatapp.entity.User;
import com.chatapp.dto.ChatDto;
import com.chatapp.repository.ChatRepository;
import com.chatapp.repository.UserRepository;
import com.chatapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ChatResource {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public ChatResource(ChatRepository chatRepository, UserRepository userRepository, UserService userService) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/user/getAllUserChat")
    public ArrayList<ChatDto> getAllUserChatWithMe(){
        User user = userService.getUserWithAuthority();
        Long id = user.getId();
        Set<User> list = chatRepository.findListUserChatedWithMeIsReceiver(id);
        list.addAll(chatRepository.findListUserChatedWithMeIsSender(id));
        Set<ChatDto> chatDtoList = new HashSet<>();
        for(User u : list){
            Chatting chatting = chatRepository.findLastChatting(id, u.getId());
            ChatDto chatDto = new ChatDto(u,chatting.getContent(),calculateTime(chatting.getCreatedDate()), chatting.getCreatedDate()," ");
            chatDtoList.add(chatDto);
        }
        ArrayList<ChatDto> chatDtoList1 = new ArrayList<>(chatDtoList);
        sort(chatDtoList1);
        return chatDtoList1;
    }

    @GetMapping("/user/getListChat")
    public List<Chatting> getListChat(@RequestParam("idnguoinhan") Long idNguoiNhan){
        User user = userService.getUserWithAuthority();
        Long id = user.getId();
        return chatRepository.findByUser(id, idNguoiNhan);
    }

    public void sort(ArrayList<ChatDto> sub) {
        Collections.sort(sub, new Comparator<ChatDto>() {
            @Override
            public int compare(ChatDto o1, ChatDto o2) {
                return o2.getTimestamp().compareTo(o1.getTimestamp());
            }
        });
    }

    public String calculateTime(Timestamp t){
        Long now = System.currentTimeMillis();
        Long end = now - t.getTime();
        if(end/1000/60 < 1){
            return "1 phút";
        }
        else if(end/1000/60 >= 1 && end/1000/60 < 60){
            Integer x = Math.toIntExact(end / 1000 / 60);
            return x.toString()+" phút";
        }
        else if(end/1000/60/60 >= 1 && end/1000/60/60 < 24){
            Integer x = Math.toIntExact(end / 1000 / 60 / 60);
            return x.toString() + " giờ";
        }
        else if(end/1000/60/60/24 >= 1){
            Integer x = Math.toIntExact(end / 1000 / 60 / 60 / 24);
            return x.toString() + " ngày";
        }
        return "0 phút";
    }
}
