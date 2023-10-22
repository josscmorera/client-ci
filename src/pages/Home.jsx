import { Box } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../components/post/PostItem";
import { getPosts } from "../redux/thunks/post";
import LayoutPage from "../components/base/LayoutPage";

export default function Home() {
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <LayoutPage title={"Home Posts"} loading={loading}>
      {posts.map((post) => (
        <Box key={post._id} width="100%" maxWidth={800} margin="0 auto" p={1}>
          <PostItem
            _id={post._id}
            slug={post.slug}
            title={post.title}
            author={post.author.username}
            comments={post.comments.length}
            content={post.content}
            imageUrl={post.image}
            postDate={post.createAt}
            community={post.community?.slug}
            tag={post.tag}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
        </Box>
      ))}
    </LayoutPage>
  );
}
