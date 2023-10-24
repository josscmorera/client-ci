import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import NavBar from "../components/base/NavBar";
import { authCheck } from "../redux/thunks/auth";

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
