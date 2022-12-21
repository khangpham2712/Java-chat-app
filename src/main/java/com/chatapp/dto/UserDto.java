package com.chatapp.dto;

import com.chatapp.entity.Authority;
import com.chatapp.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
public class UserDto {
    private Long id;

    private String username;

    private String email;

    private String phone;

    private Integer actived;

    private String address;

    private String avatar;

    private Integer numOfFree;

    private Double money;

    private Set<Authority> authorities;

    private Timestamp created_date;

    public UserDto(User user){
        this.actived = user.getActived();
        this.authorities = user.getAuthorities();
        this.avatar = user.getAvatar();
        this.id = user.getId();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.created_date = user.getCreated_date();
    }
}
