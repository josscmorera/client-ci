import { Box } from "@mui/material";
import React, { useEffect } from "react";
import TagForm from "./TagForm";
import { useDispatch, useSelector } from "react-redux";

import { resetStatus } from "../../redux/slices/tag";
import { createTag } from "../../redux/thunks/tag";
import Modal from "../base/Modal";

export default function ModalAddTag({ visible, onClose }) {
  const loading = useSelector((state) => state.tag.loadingSave);
  const error = useSelector((state) => state.tag.errorSave);
  const status = useSelector((state) => state.tag.status);

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(createTag(data));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
      onClose();
    }
  }, [status]);

  return (
    <Modal open={visible} onClose={onClose} title={"Create Label"}>
      <Box sx={{ width: 400, bgcolor: "background.paper" }}>
        <TagForm onSubmit={handleSubmit} loading={loading} message={error} />
      </Box>
    </Modal>
  );
}
