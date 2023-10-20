import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import SelectCommunity from "../community/SelectCommunity";
import { TextEditor } from "../base/TextEditor";
import Dropzone from "../base/Dropzone";
import SelectTag from "../tag/SelectTag";
import Loading from "../base/Loading";

export default function PostForm({ onSubmit, loading, message }) {
  const [community, setCommunity] = React.useState(null);
  const [tag, setTag] = React.useState(null);
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.currentTarget);

    if (community) {
      data.set("community", community);
    }
    if (tag) {
      data.set("tag", tag);
    }
    if (content) {
      data.set("content", content);
    }
    if (file) {
      data.set("file", file);
    }

    console.log(file);
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
      />
      <SelectCommunity value={community} onChange={setCommunity} />
      <SelectTag value={tag} onChange={setTag} />
      <Dropzone file={file} onChange={setFile} />
      <TextEditor
        id="content"
        value={content}
        onEditorChange={(content) => setContent(content)}
      />
      {message && (
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "orange", textAlign: "center", padding: 2 }}
        >
          {message}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <Loading /> : "Submit"}
      </Button>
    </Box>
  );
}
