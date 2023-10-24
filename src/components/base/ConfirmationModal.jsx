import React from "react";
import Modal from "./Modal";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import Loading from "./Loading";

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
  error,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <CardContent>{message}</CardContent>
      {error && (
        <CardContent>
          <Typography variant="body2" color="error" component="p">
            {error}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={onClose}
          disabled={loading}
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? <Loading /> : "Confirm"}
        </Button>
      </CardActions>
    </Modal>
  );
}
