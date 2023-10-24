import {
  Box,
  Button,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpDownVoteComment from "./UpDownVoteComment";
import ButtonRound from "../base/ButtonRound";
import AddComment from "./AddComment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import ModalAddReport from "../report/ModalAddReport";
import ModalDoneteUser from "../user/ModalDoneteUser";
import { useSelector } from "react-redux";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";

export default function CommentItem({
  _id,
  user,
  content,
  createAt,
  post,
  replies = [],
  upvotes = [],
  downvotes = [],
  idx,
}) {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = React.useState(false);
  const [showReply, setShowReply] = React.useState(false);
  const userAuth = useSelector((state) => state.auth.user);

  const goToAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/u/${user.username}`);
  };

  const isOwner = userAuth?._id === user?._id;
  const isAdmin = userAuth?.role === "admin";

  return (
    <Box sx={{ p: 1 }}>
      <CardActions>
        <AccountCircleIcon sx={{ mr: 1 }} />
        <Button
          variant="text"
          sx={{ p: 0, textTransform: "lowercase", m: 0, minWidth: 0 }}
          onClick={goToAuthor}
        >
          <Typography variant="body1">u/{user?.username}</Typography>
        </Button>
        <span style={{ marginLeft: 8 }}> - </span>
        <Typography style={{ marginLeft: 8 }} color="textSecondary">
          {moment(createAt).fromNow()}
        </Typography>
      </CardActions>
      <Box
        sx={{
          borderLeft: "1px solid #ffffff55",
          marginLeft: 2,
          paddingLeft: 2,
        }}
      >
        <CardActions>
          <Box>
            {showEdit ? (
              <EditComment
                _id={_id}
                parent={parent}
                post={post}
                idx={idx}
                content={content}
                onSuccess={() => setShowEdit(false)}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </Box>
        </CardActions>
        <CardActions>
          {!isAdmin && (
            <>
              <UpDownVoteComment
                commentId={_id}
                upvotes={upvotes}
                downvotes={downvotes}
              />
              <ButtonRound
                iconLeft={
                  <IconButton>
                    <InsertCommentOutlinedIcon fontSize="small" />
                  </IconButton>
                }
                text={`${replies.length} Reply`}
                onClick={() => {
                  if (!userAuth) return alert("Please login to reply");
                  setShowReply(!showReply);
                }}
              />
            </>
          )}
          {isAdmin ? (
            <>
              <ButtonRound
                iconLeft={
                  <IconButton>
                    <InsertCommentOutlinedIcon fontSize="small" />
                  </IconButton>
                }
                text={`${replies.length} Reply`}
              />
              <DeleteComment _id={_id} />
            </>
          ) : isOwner ? (
            <>
              <ButtonRound
                iconLeft={
                  <IconButton>
                    <BorderColorIcon fontSize="small" />
                  </IconButton>
                }
                text={"Edit"}
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
              />
              <DeleteComment _id={_id} />
            </>
          ) : (
            <>
              <ModalDoneteUser user={user} />
              <ModalAddReport type="comment" id={_id} />
            </>
          )}
        </CardActions>
        <Box>
          {showReply && (
            <AddComment
              parent={_id}
              post={post}
              idx={idx}
              onSuccess={() => setShowReply(false)}
            />
          )}
          {replies.map((reply, idx) => (
            <CommentItem key={idx} {...reply} parent={_id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
