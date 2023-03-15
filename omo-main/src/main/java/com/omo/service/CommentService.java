package com.omo.service;

import java.util.List;

import com.omo.dto.Comment;

public interface CommentService {
	int join(Comment comment);
    Comment find(int cid);
    void delete(int cid);
    List<Comment> showComments();
}
 