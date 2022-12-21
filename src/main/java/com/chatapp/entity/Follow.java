package com.chatapp.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "follow")
@Getter
@Setter
@ToString
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // chu the duoc theo doi
    @ManyToOne
    @JoinColumn(name = "me")
    private User me;

    // nguoi theo doi(ban than minh)
    @ManyToOne
    @JoinColumn(name = "followers")
    private User followers;

}
