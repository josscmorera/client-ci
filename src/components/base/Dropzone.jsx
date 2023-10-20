import { Box } from "@mui/material";
import React from "react";
import { DropzoneArea } from "react-mui-dropzone";

export default function Dropzone({ file, onChange }) {
  const handleChange = (files) => {
    onChange(files[0]);
  };

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <DropzoneArea
        onChange={handleChange}
        acceptedFiles={["image/*"]}
        filesLimit={1}
        dropzoneText={"Drag and drop an image here or click"}
      />
    </Box>
  );
}
