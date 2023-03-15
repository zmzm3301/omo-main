package com.omo.dto;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

/*
 * 데이터를 표현하기 위해 정의한 클래스
 * VO(Value Object) : 단순히 데이터를 표현할 때 주로 사용하는 약어
 * DTO(Data Transfer Object) : 모델(DB)을 표현할 때 주로 사용하는 약어
 * */
@Entity
@Getter
@Setter
public class User implements Serializable {
//	private String user_email;
//	private String user_name;
//	private String user_password;
//	private int birth_year;
//	private int birth_month;
	
	@Id
	private String email;

	private String name;
	private String password;
	private String birth;
	private String sex;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setNname(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	
	
	
}