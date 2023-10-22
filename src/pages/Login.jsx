import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSelector, useDispatch } from "react-redux";

import LoginForm from "../components/auth/LoginForm";
import { login } from "../redux/thunks/auth";
import { resetStatus } from "../redux/slices/auth";

export default function Login() {
  const message = useSelector((state) => state.auth.message);
  const status = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetStatus());
      navigate("/");
    }
  }, [status]);

  const handleSubmit = (userObj) => {
    dispatch(login(userObj));
  };

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
          Log In
        </Typography>

        <LoginForm onSubmit={handleSubmit} status={status} message={message} />
      </Box>
    </Container>
  );
}
