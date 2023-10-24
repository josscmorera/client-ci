import { Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AddComment from "./AddComment";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/thunks/comment";
import Loading from "../base/Loading";
import CommentItem from "./CommentItem";

export default function Comments({ post }) {
  const user = useSelector((state) => state.auth.user);
  const comments = useSelector((state) => state.comment.comments);
  const loadingComments = useSelector((state) => state.comment.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      dispatch(getComments({ post: post._id }));
    }
  }, [post]);

  return (
    <Card sx={{ maxWidth: 1000, borderRadius: 2 }}>
      <CardContent>
        {user && (
          <>
            <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
              comment as {user?.username}
            </Typography>
            <AddComment post={post?._id} />
            <Divider />
          </>
        )}
        {loadingComments ? (
          <Loading />
        ) : comments?.length === 0 ? (
          <Typography variant="body1" component="p" sx={{ mt: 3, mb: 2 }}>
            No comments yet
          </Typography>
        ) : (
          comments?.map((comment, idx) => (
            <CommentItem key={idx} {...comment} idx={idx} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
