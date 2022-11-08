import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  let token = useSelector((state) => state.loginReducer.token);
  const navigate = useNavigate();
  if (!token) {
    console.log("check here the token:", token);
    navigate("/login");
  } else {
    // console.log("in protectedd");
    return props.compo;
  }
}
