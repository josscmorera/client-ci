import React, { useEffect } from "react";
import LayoutPage from "../components/base/LayoutPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunity } from "../redux/thunks/community";
import { getPosts } from "../redux/thunks/post";
import { Box, Typography } from "@mui/material";
import PostItem from "../components/post/PostItem";
import CommunityInfo from "../components/community/CommunityInfo";

export default function Community() {
  const { slug } = useParams();

  const posts = useSelector((state) => state.post.posts);
  const community = useSelector((state) => state.community.community);
  const loading = useSelector((state) => state.community.loading);
  const loadingPosts = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    dispatch(getCommunity(slug));
    if (posts.length === 0) dispatch(getPosts());
  }, [slug]);

  const communityPosts = posts.filter((post) => post.community?.slug === slug);

  return (
    <LayoutPage loading={loading || loadingPosts}>
      {community && <CommunityInfo {...community} posts={communityPosts} />}

      <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
        Posts
      </Typography>

      {communityPosts.map((post) => (
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
