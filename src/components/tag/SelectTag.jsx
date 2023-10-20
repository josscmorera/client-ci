import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalAddTag from "./ModalAddTag";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { getTags } from "../../redux/thunks/tag";
import Loading from "../base/Loading";

export default function SelectTag({ value, onChange }) {
  const [visible, setVisible] = React.useState(false);

  const error = useSelector((state) => state.tag.error);
  const loading = useSelector((state) => state.tag.loading);
  const tags = useSelector((state) => state.tag.tags);

  const dispatch = useDispatch();

  const options = tags.map((tag) => {
    return { value: tag._id, label: tag.name };
  });

  const onSelect = (option) => {
    if (!option) return onChange(null);

    const tag = tags.find((tag) => tag._id === option.value);

    onChange(tag._id);
  };

  const valueToOption = (value) => {
    if (!value) return;

    const tag = tags.find((tag) => tag._id === value);
    if (tag) {
      return { value: tag._id, label: tag.name };
    }
    return null;
  };

  useEffect(() => {
    if (tags.length === 0) {
      dispatch(getTags());
    }
  }, []);

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
          renderInput={(params) => <TextField {...params} label="Tag" />}
        />
        {loading && <Loading />}
        <Button onClick={() => setVisible(true)}>Create</Button>
      </Box>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <ModalAddTag visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}
