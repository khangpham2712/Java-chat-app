package com.chatapp.repository;

import com.chatapp.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query(value = "select * from follow where me = ?1",nativeQuery = true)
    public List<Follow> findByMyId(Long myId);

    @Query(value = "select * from follow where followers = ?1",nativeQuery = true)
    public List<Follow> followOfMe(Long myId);


    @Query(value = "select * from follow where followers = ?1 or me = ?1",nativeQuery = true)
    public List<Follow> listUserDakb(Long myId);

    @Query(value = "select * from follow where (followers = ?1 or me = ?1) and (followers = ?2 or me = ?2)",nativeQuery = true)
    public Follow findByAnotherId(Long myId, Long anotherId);
}
