import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "../../redux/slices/community";
import { joinCommunity, leaveCommunity } from "../../redux/thunks/community";
import Loading from "../base/Loading";

export default function JoinLeaveCommunity({ followers, _id }) {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.community.status);
  const loading = useSelector((state) => state.community.loadingSave);
  const user = useSelector((state) => state.auth.user);

  const isJoined = followers.find((f) => f._id === user?._id);

  const handleJoinLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) return;
    if (isJoined) {
      dispatch(leaveCommunity(_id));
      return;
    }
    dispatch(joinCommunity(_id));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
    }
  }, [status]);

  if (!user) return null;

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleJoinLeave}
      disabled={loading}
    >
      {loading ? <Loading /> : isJoined ? "Leave" : "Join"}
    </Button>
  );
}
