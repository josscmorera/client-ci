import { Box } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/thunks/user";
import LayoutPage from "../components/base/LayoutPage";
import UserInfo from "../components/user/UserInfo";

export default function Users() {
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (users.length === 0 && !loading) {
      dispatch(getUsers());
    }
  }, []);

  return (
    <LayoutPage title={"Admin Users"} loading={loading}>
      {users.map((user) => (
        <Box key={user._id} width="100%" maxWidth={800} margin="0 auto" p={1}>
          <UserInfo {...user} />
        </Box>
      ))}
    </LayoutPage>
  );
}
