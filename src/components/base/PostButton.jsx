import { Box } from "@mui/material";
import React from "react";

import "../../styles/PostButton.css";

export default function PostButton({ children, onClick }) {
  return (
    <div onClick={onClick} className="post-button">
      {children}
    </div>
  );
}
