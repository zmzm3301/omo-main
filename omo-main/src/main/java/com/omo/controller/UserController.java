package com.omo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RestController;

import com.omo.dto.User;
import com.omo.service.UserService;

@RestController
public class UserController {
	// 이 어노테이션 하나로 서비스와의 매핑이 자동으로 처리된다.
		@Autowired
		private UserService service;
		
		@GetMapping(path="/users")
		public List<User> getUsers(Model model){
			List<User> userList = service.showUsers();
			model.addAttribute("users", userList);
			return service.showUsers();
		}
		
		@GetMapping(path="/users/{email}")
		public User getUser(@PathVariable String email){
			return service.find(email);
		}
		
		// @RequestBody : 요청 시 포함할 데이터
		@PostMapping(path="/users")
		public User insertUser(@RequestBody User user) {
			// 실제로 삽입하는 처리를 만들어야 한다.
			service.join(user);

			return user;
		}
		
		@DeleteMapping(path="users/{email}")
		public void deleteUser(@PathVariable String email) {
			service.delete(email);
		}

	}