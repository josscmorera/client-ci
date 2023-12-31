import { useState, forwardRef, useEffect, memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../../styles/TextEditor.css";
import { Box } from "@mui/material";

const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

export const TextEditorComponent = forwardRef((props, ref) => {
  const handleFilePicker = (callback) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = async () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const id = "blobid" + new Date().getTime();
        const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(",")[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);
        callback(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // useEffect(() => {
  //   if (editorLoaded) return;
  //   const script = document.createElement("script");
  //   script.src = `https://cdn.tiny.cloud/1/${TINYMCE_API_KEY}/tinymce/6/tinymce.min.js`;
  //   script.onload = () => setEditorLoaded(true);
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // if (!editorLoaded) {
  //   return null;
  // }

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Editor
        ref={ref}
        apiKey={TINYMCE_API_KEY}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "a11ychecker",
            "advlist",
            "advcode",
            "advtable",
            "autolink",
            "checklist",
            "export",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "powerpaste",
            "fullscreen",
            "formatpainter",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "preview",
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help |" +
            "link image",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: handleFilePicker,
          link_default_target: "_blank",
          content_css: "dark",
          skin: "oxide-dark",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px: background-color: #333; }",
        }}
        {...props}
      />
    </Box>
  );
});

export default memo(TextEditorComponent);
