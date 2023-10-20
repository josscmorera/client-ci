import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import ModalAddCommunity from "./ModalAddCommunity";
import { Autocomplete, Box, Button, FormLabel, TextField } from "@mui/material";
import { getCommunities } from "../../redux/thunks/community";

export default function SelectCommunity({ value, onChange }) {
  const [visible, setVisible] = React.useState(false);

  const error = useSelector((state) => state.community.error);
  const loading = useSelector((state) => state.community.loading);
  const communities = useSelector((state) => state.community.communities);

  const dispatch = useDispatch();

  const options = communities.map((community) => {
    return { value: community._id, label: community.name };
  });

  const onSelect = (option) => {
    if (!option) return;

    const community = communities.find(
      (community) => community._id === option.value
    );

    onChange(community._id);
  };

  const valueToOption = (value) => {
    if (!value) return;

    const community = communities.find((community) => community._id === value);
    if (community) {
      return { value: community._id, label: community.name };
    }
    return null;
  };

  useEffect(() => {
    if (communities.length === 0) {
      dispatch(getCommunities());
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Community" />}
        />
        <Button onClick={() => setVisible(true)}>Create</Button>
      </Box>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <ModalAddCommunity visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}
