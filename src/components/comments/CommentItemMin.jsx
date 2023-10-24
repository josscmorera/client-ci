import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import ButtonRound from "../base/ButtonRound";
import DeleteComment from "./DeleteComment";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useSelector } from "react-redux";

export default function CommentItemMin({
  _id,
  user,
  content,
  createAt,
  post,
  parent,
  report,
  motives = [],
  replies = [],
}) {
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.user);
  const isAdmin = authUser?.role === "admin";

  const goToAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/u/${user?.username}`);
  };

  const goToPost = (event) => {
    event.stopPropagation();
    event.preventDefault();

    navigate(`/u/${user?.username}/posts/${post?.slug}`);
  };

  return (
    <Link onClick={goToPost} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          p: 1,
          mb: 4,
          borderRadius: 5,
          maxWidth: 800,
        }}
      >
        <CardActions sx={{ fontSize: 12 }}>
          {parent ? "Reply" : "Comment"} on post:{" "}
          <Button
            variant="text"
            sx={{ p: 0, textTransform: "lowercase", m: 0, minWidth: 0, ml: 1 }}
            onClick={goToPost}
          >
            <Typography variant="body1" sx={{ fontSize: 12 }}>
              {post?.slug}
            </Typography>
          </Button>
        </CardActions>
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
          <CardContent sx={{ borderLeft: parent ? "1px solid #ffffff55" : "" }}>
            <Box>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Box>
          </CardContent>
        </Box>
        {isAdmin && (
          <CardActions>
            <ButtonRound
              iconLeft={
                <IconButton>
                  <InsertCommentOutlinedIcon fontSize="small" />
                </IconButton>
              }
              text={`${replies.length} Reply`}
            />
            <DeleteComment _id={_id} />
          </CardActions>
        )}
        {report && (
          <>
            <CardContent>
              <Typography variant="h6" component="div" mb={2}>
                Reports ({motives.length})
              </Typography>

              {motives.map((motive, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="textSecondary"
                  sx={{ opacity: 0.7 }}
                >
                  {index + 1}. {motive}
                </Typography>
              ))}
            </CardContent>
          </>
        )}
      </Card>
    </Link>
  );
}
