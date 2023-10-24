import React, { useEffect } from "react";
import LayoutPage from "../components/base/LayoutPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/thunks/user";
import { getPosts } from "../redux/thunks/post";
import { Box, Typography } from "@mui/material";
import PostItem from "../components/post/PostItem";

export default function User() {
  const { username, label } = useParams();

  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.user.loading);
  const loadingPosts = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!username) return;
    dispatch(getUser(username));
    if (posts.length === 0) dispatch(getPosts());
  }, [username]);

  const userPosts = posts.filter(
    (post) => post.author?.username === username && post.tag?.slug === label
  );

  const tag = posts.find((post) => post.tag?.slug === label)?.tag;

  return (
    <LayoutPage loading={loading || loadingPosts} title={tag?.name || slug}>
      {userPosts.map((post) => (
        <Box key={post._id} width="100%" maxWidth={800} margin="0 auto" p={1}>
          <PostItem {...post} />
        </Box>
      ))}
    </LayoutPage>
  );
}
