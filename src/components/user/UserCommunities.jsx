import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities } from "../../redux/thunks/community";
import Loading from "../base/Loading";
import CommunityInfo from "../community/CommunityInfo";
import { Box, Typography } from "@mui/material";

export default function UserCommunities({ userId }) {
  const error = useSelector((state) => state.community.error);
  const loading = useSelector((state) => state.community.loading);
  const communities = useSelector((state) => state.community.communities);

  const dispatch = useDispatch();

  const userCommunities = communities.filter((community) =>
    community.followers.includes(userId)
  );

  useEffect(() => {
    if (communities.length === 0) {
      dispatch(getCommunities());
    }
  }, []);

  return (
    <Box sx={{ maxWidth: 1000 }}>
      {loading ? (
        <Loading />
      ) : userCommunities?.length === 0 ? (
        <Typography variant="body1" component="p" sx={{ mt: 3, mb: 2 }}>
          No communities yet
        </Typography>
      ) : (
        userCommunities?.map((item, idx) => (
          <CommunityInfo key={idx} {...item} idx={idx} itemClick />
        ))
      )}
    </Box>
  );
}
