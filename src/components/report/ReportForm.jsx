import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Loading from "../base/Loading";

const options = [
  "Breaks rules",
  "Harassment",
  "Threatening violence",
  "Hate",
  "Minor abuse or sexualization",
  "Sharing personal information",
  "Non-consensual intimate media",
  "Prohibited transaction",
  "Impersonation",
  "Copyright violation",
  "Trademark violation",
  "Self-harm or suicide",
  "Spam",
];

export default function ReportForm({ onSubmit, loading, error }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(selectedOption);
  };

  return (
    <Box style={{ padding: 20 }}>
      <Typography variant="span">
        Thanks for looking out for yourself and users by reporting things that
        break the rules. Let us know what's happening, and we'll look into it.{" "}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {error && (
        <Typography
          variant="body1"
          component="p"
          sx={{ mt: 3, mb: 2, color: "red" }}
        >
          {error}
        </Typography>
      )}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedOption || loading}
        >
          {loading ? <Loading /> : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}
