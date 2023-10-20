import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CommunityForm from "./CommunityForm";
import { useDispatch, useSelector } from "react-redux";

import { resetStatus } from "../../redux/slices/community";
import { createCommunity } from "../../redux/thunks/community";
import Modal from "../base/Modal";

export default function ModalAddCommunity({ visible, onClose }) {
  const loading = useSelector((state) => state.community.loadingSave);
  const error = useSelector((state) => state.community.errorSave);
  const status = useSelector((state) => state.community.status);

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(createCommunity(data));
  };

  console.log("status", status);
  useEffect(() => {
    console.log("status fulfilled", status === "fulfilled");
    if (status === "fulfilled") {
      resetStatus();
      onClose();
    }
  }, [status]);

  return (
    <Modal open={visible} onClose={onClose} title={"Create Community"}>
      <Box sx={{ width: 400, bgcolor: "background.paper" }}>
        <CommunityForm
          onSubmit={handleSubmit}
          loading={loading}
          message={error}
        />
      </Box>
    </Modal>
  );
}
