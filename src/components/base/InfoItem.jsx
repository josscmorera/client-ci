import { Box, Typography } from "@mui/material";
import React from "react";

export default function InfoItem({ icon, number, name }) {
  return (
    <Box
      sx={{
        width: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
      <Typography variant="body2" component="p">
        <strong>{number}</strong> {name}
      </Typography>
    </Box>
  );
}
