import React, { useEffect } from "react";
import LayoutPage from "../components/base/LayoutPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/thunks/user";
import { getPosts } from "../redux/thunks/post";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PostItem from "../components/post/PostItem";
import UserInfo from "../components/user/UserInfo";
import UserComments from "../components/comments/UserComments";
import UserCommunities from "../components/user/UserCommunities";

export default function User() {
  const { username } = useParams();
  const [value, setValue] = React.useState(0);

  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const loadingPosts = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!username) return;
    dispatch(getUser(username));
    if (posts.length === 0) dispatch(getPosts());
  }, [username]);

  const userPosts = posts.filter((post) => post.author?.username === username);

  return (
    <LayoutPage loading={loading || loadingPosts}>
      {user && <UserInfo {...user} posts={userPosts} />}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2, mt: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
          {/* <Tab label="followers" {...a11yProps(2)} />
          <Tab label="following" {...a11yProps(3)} /> */}
          <Tab label="Communities" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {value === 0 && (
        <>
          {userPosts.map((post) => (
            <Box
              key={post._id}
              width="100%"
              maxWidth={800}
              margin="0 auto"
              p={1}
            >
              <PostItem {...post} />
            </Box>
          ))}
        </>
      )}

      {value === 1 && <UserComments user={user} />}
      {value === 2 && <UserCommunities userId={user._id} />}
    </LayoutPage>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
