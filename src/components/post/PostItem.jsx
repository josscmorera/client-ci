import React from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { Link, useNavigate } from "react-router-dom";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { URL_IMAGE } from "../../helpers/constants";
import UpDownVotePost from "./UpDownVotePost";

import "../../styles/PostItem.css";
import { Box, IconButton } from "@mui/material";

export default function PostItem({
  title,
  author,
  slug,
  comments,
  content,
  imageUrl,
  postDate,
  community,
  tag,
  _id,
  upvotes,
  downvotes,
}) {
  const daysAgo = moment(postDate).fromNow();
  const navigate = useNavigate();

  const goToCommunityOrAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (community) {
      navigate(`/r/${community}`);
    } else {
      navigate(`/u/${author}`);
    }
  };

  const goToAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();

    navigate(`/u/${author}`);
  };

  const getLink = () => {
    if (community) {
      return `/r/${community}/posts/${slug}`;
    } else {
      return `/u/${author}/posts/${slug}`;
    }
  };

  const goToLabel = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (community) {
      navigate(`/r/${community}/label/${tag.slug}`);
    } else {
      navigate(`/u/${author}/label/${tag.slug}`);
    }
  };

  return (
    <Link to={getLink()} style={{ textDecoration: "none" }}>
      <Card className="post">
        <CardContent>
          <Button
            variant="text"
            sx={{ p: 0, textTransform: "lowercase", m: 0, minWidth: 0 }}
            onClick={goToCommunityOrAuthor}
          >
            <Typography variant="body1">
              {community ? `r/${community}` : `u/${author}`}
            </Typography>
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ opacity: 0.7 }}
          >
            Posted by{" "}
            <a className="author-link" onClick={goToAuthor}>
              u/{author}
            </a>{" "}
            - {daysAgo}
          </Typography>
          <Typography variant="h6" component="div">
            {title}{" "}
            <Chip
              label={tag.name}
              onClick={goToLabel}
              color="primary"
              size="small"
            />
          </Typography>
        </CardContent>
        {imageUrl && (
          <CardMedia
            component="img"
            sx={{ objectFit: "contain", pr: 10, pl: 10, maxHeight: 300 }}
            image={`${URL_IMAGE}/${imageUrl}`}
            alt="Post Image"
          />
        )}
        {content && (
          <CardContent
            sx={{ maxHeight: 200, overflow: "hidden" }}
            className="content"
          >
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </CardContent>
        )}
        <CardActions>
          <UpDownVotePost
            upvotes={upvotes}
            downvotes={downvotes}
            postId={_id}
          />
          <Box
            sx={{ borderRadius: 20, backgroundColor: "#3d3d3d", pr: 2, pl: 1 }}
          >
            <IconButton aria-label="Comments">
              <InsertCommentOutlinedIcon fontSize="small" />
            </IconButton>
            {comments}{" "}
          </Box>
          <Box
            sx={{ borderRadius: 20, backgroundColor: "#3d3d3d", pr: 2, pl: 1 }}
          >
            <IconButton aria-label="Comments">
              <IosShareOutlinedIcon fontSize="small" />
            </IconButton>
            Share
          </Box>
          <Box
            sx={{ borderRadius: 20, backgroundColor: "#3d3d3d", pr: 2, pl: 1 }}
          >
            <IconButton aria-label="Comments">
              <MonetizationOnOutlinedIcon fontSize="small" />
            </IconButton>
            Donate
          </Box>
          <Box
            sx={{ borderRadius: 20, backgroundColor: "#3d3d3d", pr: 2, pl: 1 }}
          >
            <IconButton aria-label="Comments">
              <FlagOutlinedIcon fontSize="small" />
            </IconButton>
            Report
          </Box>
        </CardActions>
      </Card>
    </Link>
  );
}
