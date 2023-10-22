import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/base/Loading";
import PostItem from "../components/post/PostItem";
import { getPosts } from "../redux/thunks/post";
import { copy } from "../helpers/functions";
import LayoutPage from "../components/base/LayoutPage";

export default function Populars() {
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPosts());
  }, []);

  const sortedPosts = copy(posts).sort((a, b) => {
    return (
      b.upvotes.length -
      b.downvotes.length -
      (a.upvotes.length - a.downvotes.length)
    );
  });

  return (
    <LayoutPage title={"Populars Posts"}>
      {sortedPosts.map((post) => (
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
