package com.omo.dao;

import java.util.List;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import com.omo.dto.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
@Primary
public class UserDAOImpl implements UserDAO {
	
	@PersistenceContext
	private final EntityManager em = null;

    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public User findUser(String email) {
        User findUser = em.find(User.class, email);
        return findUser;
    }

    @Override
    public void deleteByEmail(String email) {
        User user = findUser(email);
        em.remove(user);
    }

    @Override
    public List<User> showUsers() {
        return em.createQuery("select m from User m", User.class).getResultList();
    }

}
