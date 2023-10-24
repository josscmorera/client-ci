import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/thunks/comment";
import TextEditor from "../base/TextEditor";
import { Box, Button, Typography } from "@mui/material";
import Loading from "../base/Loading";
import { resetStatus } from "../../redux/slices/comment";

export default function AddComment({ parent, post, onSuccess, idx }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const status = useSelector((state) => state.comment.status);
  const loading = useSelector((state) => state.comment.loadingSave);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.comment.errorSave);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) return alert("Please login to comment");

    const commentObj = { content, parent, post };
    dispatch(createComment(commentObj));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      setContent("");
      dispatch(resetStatus());
      onSuccess && onSuccess();
    }
  }, [status]);

  return (
    <Box sx={{ mb: 2 }}>
      <TextEditor
        ref={editor}
        id={
          parent
            ? `comment-editor-${parent}-reply-${idx}`
            : post
            ? `comment-editor-${post}`
            : "comment-editor"
        }
        value={content}
        onEditorChange={(content) => setContent(content)}
      />
      {error && (
        <Typography
          variant="body1"
          component="p"
          sx={{ mt: 3, mb: 2, color: "red" }}
        >
          {error}
        </Typography>
      )}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        {parent && (
          <Button
            variant="outlined"
            size="small"
            onClick={onSuccess}
            disabled={loading}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loading /> : parent ? "Reply" : "Comment"}
        </Button>
      </Box>
    </Box>
  );
}
