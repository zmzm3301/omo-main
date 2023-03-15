package com.omo.service;

import java.util.List;
import com.omo.dto.User;

public interface UserService {
	String join(User User);
    User find(String email);
    void delete(String email);
    List<User> showUsers();
}
