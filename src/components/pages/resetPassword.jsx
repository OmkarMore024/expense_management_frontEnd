import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCurrentUser,
  resetPassword,
  updatePassword,
} from "../actions/usersAction";

const schema = yup.object().shape({
  // email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(6).max(1024).required(),
});

export default function ResetPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const loginToken = useSelector((state) => state.loginReducer.token);
  //   const userInfo = useSelector((state) => state.loginReducer.userInfo);
  const user = useSelector((state) => state.userReducer.currentUser);
  const userId = useLoaderData();

  const logninDeclined = (message) =>
    toast.error(message, {
      position: "bottom-left",
    });

  useEffect(() => {
    console.log("in reset password .jsx");
    dispatch(getCurrentUser(userId));
  }, []);

  let onSubmitData = (data) => {
    console.log(data);
    if (userId) {
      data._id = userId;
      dispatch(updatePassword(data));
      // console.log("in submit", loginToken);
      navigate("/login");
    }
  };

  return (
    <div id="login">
      <h3>in reset password page</h3>
      <div className="row py-4">
        <div className="reset-block">
          <div className="login-form justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmitData)} className="form-page">
              <h4 className="header-register mb-4" htmlFor="nameIn">
                Reset Password
              </h4>
              <div>
                <label htmlFor="passwordIn" className="my-1">
                  Password
                </label>
                <input
                  type={"password"}
                  className="form-control bar"
                  placeholder="Must be 6 character"
                  {...register("password")}
                  id="passwordIn"
                  required
                />
                <p>{errors.password?.message}</p>
              </div>

              <button type="submit" className="btn btn-primary ">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
