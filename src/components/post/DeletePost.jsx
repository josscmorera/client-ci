import React, { useEffect } from "react";
import ButtonRound from "../base/ButtonRound";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../base/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/thunks/post";
import { resetStatus } from "../../redux/slices/post";
import { IconButton } from "@mui/material";

export default function DeletePost({ _id }) {
  const [open, setOpen] = React.useState(false);

  const loading = useSelector((state) => state.post.loadingSave);
  const error = useSelector((state) => state.post.errorSave);
  const status = useSelector((state) => state.post.status);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(deletePost(_id));
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
        title={"Delete post"}
        message={"Are you sure you want to delete this post?"}
      />
    </>
  );
}
