import React, { useEffect } from "react";
import ButtonRound from "../base/ButtonRound";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../base/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/thunks/comment";
import { resetStatus } from "../../redux/slices/comment";
import { IconButton } from "@mui/material";

export default function DeleteComment({ _id }) {
  const [open, setOpen] = React.useState(false);

  const loading = useSelector((state) => state.comment.loadingSave);
  const error = useSelector((state) => state.comment.errorSave);
  const status = useSelector((state) => state.comment.status);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(deleteComment(_id));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
      setOpen(false);
    }
  }, [status]);

  return (
    <>
      <ButtonRound
        iconLeft={
          <IconButton aria-label="Delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        }
        text={"Delete"}
        onClick={() => setOpen(true)}
      />
      <ConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleSubmit}
        loading={loading}
        error={error}
        title={"Delete comment"}
        message={"Are you sure you want to delete this comment?"}
      />
    </>
  );
}
