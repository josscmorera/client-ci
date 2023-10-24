import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useSelector, useDispatch } from "react-redux";

import { resetStatus } from "../redux/slices/post";
import PostForm from "../components/post/PostForm";
import { createPost } from "../redux/thunks/post";
import Login from "./Login";

export default function NewPost() {
  const user = useSelector((state) => state.auth.user);

  const loading = useSelector((state) => state.post.loadingSave);
  const error = useSelector((state) => state.post.errorSave);
  const status = useSelector((state) => state.post.status);
  const post = useSelector((state) => state.post.post);

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
    dispatch(createPost(data));
  };

  if (!user) return <Login />;

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
      </Box>
      <PostForm
        onSubmit={handleSubmit}
        status={status}
        message={error}
        loading={loading}
      />
    </Container>
  );
}
