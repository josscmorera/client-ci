import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loading({ size = 30 }) {
  return <CircularProgress color="inherit" size={size} />;
}
