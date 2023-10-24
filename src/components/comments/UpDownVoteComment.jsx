import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlineIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { downvoteComment, upvoteComment } from "../../redux/thunks/comment";
import ButtonRound from "../base/ButtonRound";

export default function UpDownVoteComment({
  commentId,
  upvotes = [],
  downvotes = [],
}) {
  const [score, setScore] = React.useState(upvotes.length - downvotes.length);
  const [isUpvoted, setIsUpvoted] = React.useState(false);
  const [isDownvoted, setIsDownvoted] = React.useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setScore(upvotes.length - downvotes.length);
    const isUpvoted = upvotes.includes(user?._id);
    const isDownvoted = downvotes.includes(user?._id);
    setIsUpvoted(isUpvoted);
    setIsDownvoted(isDownvoted);
  }, [upvotes.length, downvotes.length, user?._id]);

  const UpIcon = !isUpvoted ? ThumbUpOutlinedIcon : ThumbUpIcon;
  const DownIcon = !isDownvoted ? ThumbDownOutlineIcon : ThumbDownIcon;

  const handleUpvote = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) return alert("Please login to vote");
    dispatch(upvoteComment(commentId));
    setIsUpvoted(!isUpvoted);
    isDownvoted && setIsDownvoted(false);
  };

  const handleDownvote = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) return alert("Please login to vote");
    dispatch(downvoteComment(commentId));
    setIsDownvoted(!isDownvoted);
    isUpvoted && setIsUpvoted(false);
  };

  return (
    <ButtonRound
      iconLeft={
        <IconButton aria-label="Upvote" onClick={handleUpvote}>
          <UpIcon fontSize="small" color={isUpvoted ? "info" : "white"} />
        </IconButton>
      }
      iconRight={
        <IconButton aria-label="Downvote" onClick={handleDownvote}>
          <DownIcon fontSize="small" color={isDownvoted ? "error" : "white"} />
        </IconButton>
      }
      text={score}
    />
  );
}
