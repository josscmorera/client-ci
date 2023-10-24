import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalAddCommunity from "./ModalAddCommunity";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { getCommunities } from "../../redux/thunks/community";
import Loading from "../base/Loading";

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
    if (!option) return onChange(null);

    const community = communities.find(
      (community) => community._id === option.value
    );

    onChange(community._id);
  };

  const valueToOption = (value) => {
    if (!value) return null;

    return options.find((option) => option.value === value);
  };

  useEffect(() => {
    if (communities.length === 0) {
      dispatch(getCommunities());
    }
  }, []);

  const inputValue = valueToOption(value)?.label || "";

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
        <Autocomplete
          disablePortal
          value={valueToOption(value)}
          id="combo-box-demo"
          options={options}
          sx={{ width: 500 }}
          onChange={(event, option) => onSelect(option)}
          renderInput={(params) => <TextField {...params} label="Community" />}
        />
        {loading && <Loading />}
        <Button onClick={() => setVisible(true)}>Create</Button>
      </Box>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <ModalAddCommunity visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}
