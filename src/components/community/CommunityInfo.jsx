import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import JoinLeaveCommunity from "./JoinLeaveCommunity";

export default function CommunityInfo({
  _id,
  name,
  slug,
  description,
  followers = [],
  posts = [],
  createdBy,
  createdAt,
}) {
  const navigate = useNavigate();

  const goToAuthor = (event) => {
    event.stopPropagation();
    event.preventDefault();

    navigate(`/u/${createdBy?.username}`);
  };

  return (
    <Card sx={{ borderRadius: 5, maxWidth: 800 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            {name}
          </Typography>
          <JoinLeaveCommunity followers={followers} _id={_id} />
        </Box>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          r/{slug}
        </Typography>
        <Typography variant="body2" component="p" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ mb: 2 }}
          color="text.secondary"
        >
          Created by{" "}
          <a className="author-link" onClick={goToAuthor}>
            u/{createdBy?.username}
          </a>{" "}
          on {moment(createdAt).format("LL")}
        </Typography>
        <Divider />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              width: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PeopleIcon />
            <Typography variant="body2" component="p">
              <strong>{followers.length}</strong> Members
            </Typography>
          </Box>
          <Box
            sx={{
              width: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BookmarkIcon />
            <Typography variant="body2" component="p">
              <strong>{posts.length}</strong> Posts
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
