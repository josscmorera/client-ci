import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateUser } from "../redux/thunks/user";
import { resetStatus } from "../redux/slices/user";
import RegisterForm from "../components/auth/RegisterForm";

export default function Settings() {
  const status = useSelector((state) => state.user.status);
  const message = useSelector((state) => state.user.errorSave);
  const loading = useSelector((state) => state.user.loadingSave);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (userObj) => {
    dispatch(updateUser({ _id: user._id, ...userObj }));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
      navigate("/u/" + user.username);
    }
  }, [status]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <RegisterForm
          onSubmit={handleSubmit}
          loading={loading}
          message={message}
          user={user}
        />
      </Box>
    </Container>
  );
}
