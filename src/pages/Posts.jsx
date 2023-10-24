import { Box } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../components/post/PostItem";
import { getPosts } from "../redux/thunks/post";
import LayoutPage from "../components/base/LayoutPage";

export default function Posts() {
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <LayoutPage title={"Admin Posts"} loading={loading}>
      {posts.map((post) => (
        <Box key={post._id} width="100%" maxWidth={800} margin="0 auto" p={1}>
          <PostItem {...post} />
        </Box>
      ))}
    </LayoutPage>
  );
}
