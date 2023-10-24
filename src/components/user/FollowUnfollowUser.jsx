import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "../../redux/slices/user";
import { followUser, unfollowUser } from "../../redux/thunks/user";
import Loading from "../base/Loading";
import { useNavigate } from "react-router-dom";

export default function FollowUnfollowUser({ _id }) {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.user.status);
  const loading = useSelector((state) => state.user.loadingSave);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const isFollow = user?.following.find((f) => f === _id);

  const isOwner = user?._id === _id;

  const handleFollow = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) return;
    if (isOwner) {
      navigate("/settings");
      return;
    }
    if (isFollow) {
      dispatch(unfollowUser(_id));
      return;
    }
    dispatch(followUser(_id));
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
      onClick={handleFollow}
      disabled={loading}
    >
      {isOwner ? (
        "Editar"
      ) : loading ? (
        <Loading />
      ) : isFollow ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
