package com.chatapp.dto;

import com.chatapp.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ChatDto {
    private User user;
    private String lastContent;
    private String time;
    private Timestamp timestamp;
    private String styleContent;
}
