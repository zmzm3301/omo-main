package com.omo.dao;

import java.util.List;

import com.omo.dto.Comment;

public interface CommentDAO {

	Comment save(Comment comment);

	Comment findComment(int cid);

	void deleteByCid(int cid);

	List<Comment> showComments();


}
