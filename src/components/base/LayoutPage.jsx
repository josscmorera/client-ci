import { Box, Typography } from "@mui/material";
import * as React from "react";
import Loading from "./Loading";

export default function LayoutPage({ loading, children, title }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: 10,
      }}
    >
      <Box p={2}>
        {title && (
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        )}

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={100}
          >
            <Loading size={100} />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}
