import { Box, FormLabel, TextField } from "@mui/material";
import React from "react";
import SelectCommunity from "../community/SelectCommunity";
import { TextEditor } from "../base/TextEditor";
import Dropzone from "../base/Dropzone";

export default function PostForm({ onSubmit, loading, message }) {
  const ref = React.useRef(null);
  const [type, setType] = React.useState("");
  const [community, setCommunity] = React.useState(null);
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState(null);

  const handleSubmit = (event) => {
    console.log("call postForm");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (type === "community") {
      data.set("community", community);
    }

    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <SelectCommunity
        value={community}
        onChange={setCommunity}
        changeType={setType}
      />
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
      <Dropzone file={file} onChange={setFile} />
      <TextEditor
        ref={ref}
        id="content"
        value={content}
        onEditorChange={(content) => setContent(content)}
      />
    </Box>
  );
}
