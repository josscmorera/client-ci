import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Loading from "../base/Loading";

export default function CommunityForm({ onSubmit, message, loading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.currentTarget);

    const formDataObj = {};
    data.forEach((value, key) => (formDataObj[key] = value));

    onSubmit(formDataObj);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        rows={3}
        name="description"
        label="Description"
        id="description"
      />

      {message && (
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "orange", textAlign: "center", padding: 2 }}
        >
          {message}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <Loading /> : "Submit"}
      </Button>
    </Box>
  );
}
