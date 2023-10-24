import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../redux/thunks/report";
import { resetStatus } from "../../redux/slices/report";
import ButtonRound from "../base/ButtonRound";
import { IconButton } from "@mui/material";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import Modal from "../base/Modal";
import ReportForm from "./ReportForm";

export default function ModalAddReport({ type, id }) {
  const [open, setOpen] = React.useState(false);

  const loading = useSelector((state) => state.report.loadingSave);
  const error = useSelector((state) => state.report.errorSave);
  const status = useSelector((state) => state.report.status);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleOpen = (event) => {
    event && event.preventDefault();
    event && event.stopPropagation();
    if (!user) return alert("Please login to report");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleReport = (content) => {
    const reportObj = { type, typeId: id, content };
    dispatch(createReport(reportObj));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
      handleClose();
    }
  }, [status]);

  return (
    <>
      <ButtonRound
        iconLeft={
          <IconButton>
            <FlagOutlinedIcon fontSize="small" />
          </IconButton>
        }
        text="Report"
        onClick={handleOpen}
      />
      <Modal open={open} onClose={handleClose} title="Send Report">
        <ReportForm onSubmit={handleReport} loading={loading} error={error} />
      </Modal>
    </>
  );
}
