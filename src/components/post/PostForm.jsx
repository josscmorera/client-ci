import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SelectCommunity from "../community/SelectCommunity";
import TextEditor from "../base/TextEditor";
import Dropzone from "../base/Dropzone";
import SelectTag from "../tag/SelectTag";
import Loading from "../base/Loading";
import { URL_IMAGE } from "../../helpers/constants";

export default function PostForm({ onSubmit, loading, message, post }) {
  const [community, setCommunity] = React.useState(null);
  const [tag, setTag] = React.useState(null);
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [urlImage, setUrlImage] = React.useState(null);

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

    if (title) {
      data.set("title", title);
    }

    onSubmit(data);
  };

  useEffect(() => {
    if (post) {
      setCommunity(post.community?._id);
      setTag(post.tag?._id);
      setContent(post.content);
      setTitle(post.title);
      setUrlImage(`${URL_IMAGE}/${post.image}`);
    } else {
      setCommunity(null);
      setTag(null);
      setContent("");
      setFile(null);
      setTitle("");
    }
  }, [post]);

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <SelectCommunity value={community} onChange={setCommunity} />
      <SelectTag value={tag} onChange={setTag} />
      <Dropzone file={file} onChange={setFile} />
      {urlImage && (
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", pr: 10, pl: 10, maxHeight: 100 }}
          image={urlImage}
          alt="Post Image"
        />
      )}
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
