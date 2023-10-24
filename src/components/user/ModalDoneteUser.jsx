import React, { useEffect } from "react";
import ButtonRound from "../base/ButtonRound";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Modal from "../base/Modal";
import Loading from "../base/Loading";
import { useDispatch, useSelector } from "react-redux";
import { donateCoins } from "../../redux/thunks/user";
import { resetStatus } from "../../redux/slices/user";

export default function ModalDoneteUser({ user }) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);

  const userAuth = useSelector((state) => state.auth.user);

  const handleOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!userAuth) return alert("Please login to donate");

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const loading = useSelector((state) => state.user.loadingSave);
  const error = useSelector((state) => state.user.errorSave);
  const status = useSelector((state) => state.user.status);

  const dispatch = useDispatch();

  const handleDonate = () => {
    const donationObj = { user: user?._id, coins: amount };
    dispatch(donateCoins(donationObj));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      setAmount(0);
      dispatch(resetStatus());
      handleClose();
    }
  }, [status]);

  return (
    <>
      <ButtonRound
        iconLeft={
          <IconButton>
            <MonetizationOnOutlinedIcon fontSize="small" />
          </IconButton>
        }
        text="Donate"
        onClick={handleOpen}
      />
      <Modal open={open} onClose={handleClose} title="Donate">
        <Typography variant="body1" component="p" sx={{ mb: 2, mt: 2 }}>
          Donate coins to u/{user?.username}:
        </Typography>
        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          sx={{ width: 300 }}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && (
          <Typography
            variant="body1"
            component="p"
            sx={{ mt: 3, mb: 2, color: "red" }}
          >
            {error}
          </Typography>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleDonate}
          >
            {loading ? <Loading /> : "Donate"}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
