package com.chatapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class KeyForgetController {

    @RequestMapping(value = {"/keyforget"}, method = RequestMethod.GET)
    public String getHomePage() {

        return "keyforget";
    }
}
