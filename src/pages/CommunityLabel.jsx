import React, { useEffect } from "react";
import LayoutPage from "../components/base/LayoutPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunity } from "../redux/thunks/community";
import { getPosts } from "../redux/thunks/post";
import { Box } from "@mui/material";
import PostItem from "../components/post/PostItem";

export default function CommunityLabel() {
  const { slug, label } = useParams();

  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.community.loading);
  const loadingPosts = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    dispatch(getCommunity(slug));
    if (posts.length === 0) dispatch(getPosts());
  }, [slug]);

  const communityPosts = posts.filter(
    (post) => post.community?.slug === slug && post.tag?.slug === label
  );
  const tag = posts.find((post) => post.tag?.slug === label)?.tag;

  return (
    <LayoutPage loading={loading || loadingPosts} title={tag?.name || label}>
      {communityPosts.map((post) => (
        <Box key={post._id} width="100%" maxWidth={800} margin="0 auto" p={1}>
          <PostItem {...post} />
        </Box>
      ))}
    </LayoutPage>
  );
}
