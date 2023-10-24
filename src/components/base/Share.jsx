import React from "react";
import ButtonRound from "./ButtonRound";
import { IconButton } from "@mui/material";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

export default function Share({ link }) {
  const share = async (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();
      const fullLink = `${window.location.origin}${link}`;
      await navigator.clipboard.writeText(fullLink);
      alert("Link copied to clipboard \n" + fullLink);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ButtonRound
      onClick={share}
      iconLeft={
        <IconButton>
          <IosShareOutlinedIcon fontSize="small" />
        </IconButton>
      }
      text="Share"
    />
  );
}
