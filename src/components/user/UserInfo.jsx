import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FollowUnfollowUser from "./FollowUnfollowUser";
import InfoItem from "../base/InfoItem";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector } from "react-redux";

export default function UserInfo({
  _id,
  firstName,
  lastName,
  username,
  followers = [],
  following = [],
  posts = [],
  createdAt,
  coins,
}) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Card sx={{ borderRadius: 5, maxWidth: 800 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            {`${firstName} ${lastName}`}
          </Typography>
          <FollowUnfollowUser following={following} _id={_id} />
        </Box>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          u/{username}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          sx={{ mb: 2 }}
          color="text.secondary"
        >
          Since {moment(createdAt).format("LL")}
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
          <InfoItem
            icon={<BookmarkIcon />}
            number={posts.length}
            name="Posts"
          />
          <InfoItem
            icon={<PeopleIcon />}
            number={followers.length}
            name="Followers"
          />
          <InfoItem
            icon={<PeopleIcon />}
            number={following.length}
            name="Following"
          />
          {user?._id === _id && (
            <InfoItem
              icon={<MonetizationOnOutlinedIcon />}
              number={coins}
              name="coins"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
