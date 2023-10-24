import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import NavBar from "../components/base/NavBar";
import { authCheck } from "../redux/thunks/auth";
import NavBarAdmin from "../components/base/NavBarAdmin";

const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuth = useSelector((state) => state.auth.user);

  const isAdmin = userAuth?.role === "admin";

  useEffect(() => {
    dispatch(authCheck());
  }, []);

  React.useEffect(() => {
    if (!isAdmin && window.location.pathname.includes("admin")) {
      navigate("/");
    }
  }, [userAuth]);

  return (
    <>
      {isAdmin ? <NavBarAdmin /> : <NavBar />}
      <Outlet />
    </>
  );
};

export default Root;
