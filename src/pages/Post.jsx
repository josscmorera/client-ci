import React, { useEffect } from "react";
import LayoutPage from "../components/base/LayoutPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/thunks/post";
import { Box, Typography } from "@mui/material";

import PostInfo from "../components/post/PostInfo";
import Comments from "../components/comments/Comments";

export default function Post() {
  const { slug } = useParams();

  const post = useSelector((state) => state.post.post);
  const loadingPost = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    dispatch(getPost(slug));
  }, [slug]);

  useEffect(() => {
    setTimeout(() => {
      if (window.location.hash === "#comments") {
        const comments = document.getElementById("comments");
        comments.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, []);

  return (
    <LayoutPage loading={loadingPost}>
      {post && <PostInfo {...post} />}

      <Box id="comments">
        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Comments
        </Typography>
        <Comments post={post} />
      </Box>
    </LayoutPage>
  );
}
