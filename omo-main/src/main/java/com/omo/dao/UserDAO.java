package com.omo.dao;
import java.util.List;

import com.omo.dto.User;

public interface UserDAO {
	User save(User user);
    void deleteByEmail(String email);
    List<User> showUsers();
	User findUser(String email);
}