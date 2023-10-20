import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSelector, useDispatch } from "react-redux";

import { register } from "../redux/thunks/user";
import RegisterForm from "../components/auth/RegisterForm";
import { resetStatus } from "../redux/slices/user";

export default function Register() {
  const status = useSelector((state) => state.user.status);
  const message = useSelector((state) => state.user.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (userObj) => {
    dispatch(register(userObj));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
      navigate("/");
    }
  }, [status]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <RegisterForm
          onSubmit={handleSubmit}
          status={status}
          message={message}
        />
      </Box>
    </Container>
  );
}
