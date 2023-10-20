import React from "react";
import { DropzoneArea } from "react-mui-dropzone";

export default function Dropzone({ file, onChange }) {
  const handleChange = (files) => {
    onChange(files[0]);
  };

  return (
    <DropzoneArea
      onChange={handleChange}
      acceptedFiles={["image/*"]}
      filesLimit={1}
      dropzoneText={"Drag and drop an image here or click"}
    />
  );
}
