import { Box } from "@mui/material";
import React from "react";
import "../../styles/ButtonRound.css";

export default function ButtonRound({ iconRight, text, onClick, iconLeft }) {
  return (
    <Box
      onClick={onClick}
      sx={{ pl: 1, pr: iconRight ? 1 : 2 }}
      className={`button-round ${!iconRight ? "hide-text" : ""}`}
    >
      {iconLeft}
      <span>{text}</span>
      {iconRight}
    </Box>
  );
}
