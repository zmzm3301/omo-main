package com.omo.service;

import java.util.HashMap;
import java.util.List;

import com.omo.dto.KPerson;

public interface KaKaoService {
	String getKakaoAccessToken(String code);
	HashMap<String, Object> getUserInfo (String access_Token);
	void addkperson(KPerson kperson);
	List<KPerson> Kpersons();
	void delKperosn(String email);
	KPerson upKperson(String email, KPerson kperson);
}
