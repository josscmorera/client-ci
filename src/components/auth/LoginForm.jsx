import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "../base/Loading";

export default function LoginForm({ onSubmit, message, loading }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userObj = {
      email: data.get("email"),
      password: data.get("password"),
      isRemember: isChecked,
    };
    onSubmit(userObj);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        }
        label="Remember Me"
      />
      {message && (
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: "orange", textAlign: "center", padding: 2 }}
        >
          {message}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {loading ? <Loading /> : "Log In"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" variant="body2">
            {"Don't have an account? Please Register"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
