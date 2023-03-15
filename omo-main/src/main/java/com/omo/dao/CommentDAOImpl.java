package com.omo.dao;

import java.util.List;

import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.omo.dto.Comment;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
@Primary
public class CommentDAOImpl implements CommentDAO{
	
	@PersistenceContext
	private final EntityManager em = null;

	@Override
	@Transactional
	public Comment save(Comment comment) {
		em.persist(comment);
        return comment;
	}

	@Override
	@Transactional
	public Comment findComment(int cid) {
		Comment findComment = em.find(Comment.class, cid);
        return findComment;
	}

	@Override
	@Transactional
	public void deleteByCid(int cid) {
		Comment comment = findComment(cid);
        em.remove(comment);
	}

	@Override
	@Query
	public List<Comment> showComments() {
		return em.createQuery("select m from comment m", Comment.class).getResultList();
	}
}
