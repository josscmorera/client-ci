// import { Box } from "@mui/material";
// import React from "react";
// import { DropzoneArea } from "react-mui-dropzone";
// import "../../styles/Dropzone.css";

// export default function Dropzone({ file, onChange }) {
//   const handleChange = (files) => {
//     onChange(files[0]);
//   };

//   return (
//     <Box sx={{ mt: 2, mb: 1 }} className="dropzone">
//       <DropzoneArea
//         onChange={handleChange}
//         acceptedFiles={["image/*"]}
//         filesLimit={1}
//         dropzoneText={"Drag and drop an image here or click"}
//       />
//     </Box>
//   );
// }

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Paper } from "@mui/material";
import { Upload, UploadFile } from "@mui/icons-material";

const DropzoneStyled = ({ onChange }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
      onChange(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div>
      <Paper
        variant="outlined"
        elevation={3}
        sx={{ p: 2, mt: 2, mb: 1, height: 250, textAlign: "center" }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <Upload sx={{ fontSize: 40, p: 0 }} />
        <p style={{ margin: 10 }}>Drag and drop an image here or click</p>
        {previewImage && (
          <img
            src={previewImage}
            alt="Vista previa de la imagen"
            style={{ maxWidth: "100%", maxHeight: "100px" }}
          />
        )}
      </Paper>
    </div>
  );
};

export default DropzoneStyled;
