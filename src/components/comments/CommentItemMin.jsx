import { Box, Button, Card, CardActions, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

export default function CommentItemMin({
  _id,
  user,
  content,
  createAt,
  post,
  parent,
}) {
  const navigate = useNavigate();

  const goToAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/u/${user?.username}`);
  };

  const goToPost = (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/r/${post?.slug}`);
  };

  return (
    <Link to={`/r/${post?.slug}`} style={{ textDecoration: "none" }}>
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
              r/{post?.slug}
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
          <CardActions sx={{ borderLeft: parent ? "1px solid #ffffff55" : "" }}>
            <Box>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Link>
  );
}
