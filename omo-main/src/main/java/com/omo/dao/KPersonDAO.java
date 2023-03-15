package com.omo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.omo.dto.KPerson;

@Repository
public interface KPersonDAO {
	List<KPerson> kpersons();

	void addkperson(KPerson kperson);

	void delKperson(String email);

	int upKperson(String email, KPerson kperson);
}
