package com.omo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.omo.dao.CommentDAO;
import com.omo.dto.Comment;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentDAO dao;

	@Override
	public int join(Comment comment) {
		Comment joinComment = dao.save(comment);
        return joinComment.getCid();
	}

	@Override
	public Comment find(int cid) {
		return dao.findComment(cid);
	}

	@Override
	public void delete(int cid) {
		dao.deleteByCid(cid);
	}

	@Override
	public List<Comment> showComments() {
		List<Comment> comments = dao.showComments();
		return comments;
	}

}
