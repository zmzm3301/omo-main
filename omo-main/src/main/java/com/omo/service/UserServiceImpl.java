package com.omo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.omo.dao.UserDAO;
import com.omo.dto.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDAO dao;
	
	@Override
    public List<User> showUsers() {
        List<User> users = dao.showUsers();
        return users;
    }
	
	@Override
    public User find(String email) {
        User user = dao.findUser(email);
        return user;
    }

    @Override
    public String join(User user) {
        User joinUser = dao.save(user);
        return joinUser.getEmail();
    }

    @Override
    public void delete(String email) {
        dao.deleteByEmail(email);
    }

}