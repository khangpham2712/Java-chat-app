package com.chatapp.repository;

import com.chatapp.entity.Chatting;
import com.chatapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ChatRepository extends JpaRepository<Chatting, Long> {

    @Query(value = "select * from chatting where (sender = ?1 and receiver = ?2) or (receiver = ?1 and sender = ?2) order by id asc", nativeQuery = true)
    public List<Chatting> findByUser(Long idSender, Long idReceiver);

    @Query("select c.sender from Chatting c inner join c.receiver r where r.id = ?1 ")
    public Set<User> findListUserChatedWithMeIsReceiver(Long myId);

    @Query("select c.receiver from Chatting c inner join c.sender r where r.id = ?1 ")
    public Set<User> findListUserChatedWithMeIsSender(Long myId);

    @Query(value = "select * from chatting where (sender = ?1 and receiver = ?2) or (receiver = ?1 and sender = ?2) order by id desc limit 1 offset  0", nativeQuery = true)
    public Chatting findLastChatting(Long idSender, Long idReceiver);
}
