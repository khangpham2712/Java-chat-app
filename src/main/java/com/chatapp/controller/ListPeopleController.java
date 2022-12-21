package com.chatapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ListPeopleController {

    @RequestMapping(value = {"/listpeople"}, method = RequestMethod.GET)
    public String getListPeople() {

        return "listpeople";
    }
}
