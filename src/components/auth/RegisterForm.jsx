import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Loading from "../base/Loading";

export default function RegisterForm({ onSubmit, message, status }) {
  const [pwdMatch, setPwdMatch] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userObj = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
    };

    const isConfirmPwdMatch = userObj.password === data.get("confirm-password");

    if (!isConfirmPwdMatch) {
      setPwdMatch({
        error: true,
        message: "Password doesn't Match!",
      });
    } else {
      setPwdMatch({
        error: false,
        message: "",
      });
    }

    isConfirmPwdMatch && onSubmit(userObj);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            error={pwdMatch.error}
            helperText={pwdMatch.message}
          />
        </Grid>
      </Grid>

      {message && (
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "orange", textAlign: "center", padding: 2 }}
        >
          {message}
        </Typography>
      )}
      {pwdMatch.error && (
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "orange", textAlign: "center", padding: 2 }}
        >
          {pwdMatch.message}
        </Typography>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {status === "pending" ? <Loading /> : "Register"}
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an account? Please Log in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
