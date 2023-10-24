import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { resetStatus } from "../redux/slices/post";
import PostForm from "../components/post/PostForm";
import { getPost, updatePost } from "../redux/thunks/post";
import LayoutPage from "../components/base/LayoutPage";
import { Box } from "@mui/material";

export default function PostEdit() {
  const user = useSelector((state) => state.auth.user);

  const loading = useSelector((state) => state.post.loadingSave);
  const error = useSelector((state) => state.post.errorSave);
  const status = useSelector((state) => state.post.status);
  const post = useSelector((state) => state.post.post);
  const loadingPost = useSelector((state) => state.post.loading);

  const { slug } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
      if (post.community)
        navigate("/r/" + post.community.slug + "/" + post.slug);
      navigate("/u/" + user.username + "/posts/" + post.slug);
    }
  }, [status]);

  const handleSubmit = (data) => {
    data.set("id", post._id);
    dispatch(updatePost(data));
  };

  useEffect(() => {
    if (slug) {
      dispatch(getPost(slug));
    }
  }, [slug]);

  return (
    <LayoutPage loading={loadingPost} title={"Edit Post"}>
      <Box sx={{ maxWidth: 800 }}>
        <PostForm
          onSubmit={handleSubmit}
          status={status}
          message={error}
          loading={loading}
          post={post}
        />
      </Box>
    </LayoutPage>
  );
}
