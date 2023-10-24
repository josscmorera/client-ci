import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/thunks/comment";
import Loading from "../base/Loading";
import CommentItemMin from "./CommentItemMin";

export default function UserComments({ user }) {
  const comments = useSelector((state) => state.comment.comments);
  const loadingComments = useSelector((state) => state.comment.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getComments({ user: user._id }));
    }
  }, [user]);

  return (
    <Box sx={{ maxWidth: 1000 }}>
      {loadingComments ? (
        <Loading />
      ) : comments?.length === 0 ? (
        <Typography variant="body1" component="p" sx={{ mt: 3, mb: 2 }}>
          No comments yet
        </Typography>
      ) : (
        comments?.map((comment, idx) => (
          <CommentItemMin key={idx} {...comment} idx={idx} />
        ))
      )}
    </Box>
  );
}
