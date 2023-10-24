import React from "react";
import PostItem from "../post/PostItem";
import CommentItemMin from "../comments/CommentItemMin";

export default function ReportItem({ post, comment, motives }) {
  if (post) {
    return <PostItem {...post} motives={motives} report />;
  }

  if (comment) {
    return <CommentItemMin {...comment} motives={motives} report />;
  }
}
