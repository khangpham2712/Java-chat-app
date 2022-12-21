package com.chatapp.chat;

import com.chatapp.dto.ChatDto;
import com.chatapp.entity.Chatting;
import com.chatapp.entity.User;
import com.chatapp.repository.ChatRepository;
import com.chatapp.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Controller
public class ChatController {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    public ChatController(UserRepository userRepository, ChatRepository chatRepository) {
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }


    public String getHomePage(HttpSession session,Model model) {
        System.out.println("-----------> chat session: "+session.getAttribute("iduser"));
        Long id = (Long) session.getAttribute("iduser");
        model.addAttribute("idUser",session.getAttribute("iduser"));
        model.addAttribute("username",userRepository.findById((Long) session.getAttribute("iduser")).get().getUsername());

        Set<User> list = chatRepository.findListUserChatedWithMeIsReceiver(id);
        list.addAll(chatRepository.findListUserChatedWithMeIsSender(id));
        Set<ChatDto> chatDtoList = new HashSet<>();
        for(User u : list){
            Chatting chatting = chatRepository.findLastChatting(id, u.getId());
        }
        model.addAttribute("listUser",chatDtoList);
        return "chat";
    }

    @RequestMapping(value = {"/chat","/","/trang-chu"}, method = RequestMethod.GET)
    public String getChatPage() {
        return "chat";
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
