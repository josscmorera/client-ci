import React from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { URL_IMAGE } from "../../helpers/constants";
import UpDownVotePost from "./UpDownVotePost";

import "../../styles/PostItem.css";
import { Box, IconButton } from "@mui/material";
import ButtonRound from "../base/ButtonRound";
import Share from "../base/Share";
import ModalDoneteUser from "../user/ModalDoneteUser";
import ModalAddReport from "../report/ModalAddReport";
import { useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import DeletePost from "./DeletePost";

export default function PostInfo({
  title,
  author,
  slug,
  comments = [],
  content,
  image,
  createAt,
  community,
  tag,
  _id,
  upvotes = [],
  downvotes = [],
}) {
  const daysAgo = moment(createAt).fromNow();
  const navigate = useNavigate();

  const userAuth = useSelector((state) => state.auth.user);
  const isOwner = userAuth?._id === author?._id;
  const isAdmin = userAuth?.role === "admin";

  const goToCommunityOrAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (community) {
      navigate(`/r/${community?.slug}`);
    } else {
      navigate(`/u/${author?.username}`);
    }
  };

  const goToAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();

    navigate(`/u/${author?.username}`);
  };

  const getLink = () => {
    if (community) {
      return `/r/${community?.slug}/posts/${slug}`;
    } else {
      return `/u/${author?.username}/posts/${slug}`;
    }
  };

  const goToLabel = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (community) {
      navigate(`/r/${community?.slug}/label/${tag.slug}`);
    } else {
      navigate(`/u/${author?.username}/label/${tag.slug}`);
    }
  };

  const jumpToReleventDiv = (id) => {
    const releventDiv = document.getElementById(id);
    releventDiv.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardContent>
        <Button
          variant="text"
          sx={{ p: 0, textTransform: "lowercase", m: 0, minWidth: 0 }}
          onClick={goToCommunityOrAuthor}
        >
          <Typography variant="body1">
            {community ? `r/${community?.slug}` : `u/${author?.username}`}
          </Typography>
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.7 }}>
          Posted by{" "}
          <a className="author-link" onClick={goToAuthor}>
            u/{author?.username}
          </a>{" "}
          - {daysAgo}
        </Typography>
        <Typography variant="h6" component="div">
          {title}{" "}
          {tag && (
            <Chip
              label={tag.name}
              onClick={goToLabel}
              color="primary"
              size="small"
            />
          )}
        </Typography>
      </CardContent>
      {image && (
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", pr: 10, pl: 10, maxHeight: 500 }}
          image={`${URL_IMAGE}/${image}`}
          alt="Post Image"
        />
      )}
      {content && (
        <CardContent className="content">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </CardContent>
      )}
      <CardActions>
        {!isAdmin && (
          <>
            <UpDownVotePost
              upvotes={upvotes}
              downvotes={downvotes}
              postId={_id}
            />
            <ButtonRound
              iconLeft={
                <IconButton>
                  <InsertCommentOutlinedIcon fontSize="small" />
                </IconButton>
              }
              text={`${comments.length} Comment`}
              onClick={() => jumpToReleventDiv("comments")}
            />

            <Share link={getLink()} />
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
              text={`${comments.length} Comment`}
              onClick={() => jumpToReleventDiv("comments")}
            />
            <DeletePost _id={_id} />
          </>
        ) : isOwner ? (
          <>
            <ButtonRound
              iconLeft={
                <IconButton>
                  <Edit fontSize="small" />
                </IconButton>
              }
              text="Edit"
              onClick={() => navigate(`/posts/${slug}/edit`)}
            />
            <DeletePost _id={_id} />
          </>
        ) : (
          <>
            <ModalDoneteUser user={author} />
            <ModalAddReport type="post" id={_id} />
          </>
        )}
      </CardActions>
    </Card>
  );
}
