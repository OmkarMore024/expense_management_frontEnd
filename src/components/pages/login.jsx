import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/loginAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string().min(5).max(255).email().required(),
    password: yup.string().min(6).max(1024).required(),
  });

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
  const loginToken = useSelector((state) => state.loginReducer.token);
  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const logninDeclined = (message) =>
    toast.error(message, {
      position: "bottom-left",
    });

  useEffect(() => {
    console.log("in login.jsx");
    // console.log(userInfo);
    if (userInfo) {
      if (userInfo.isActive === true) {
        if (userInfo.role === "Admin") {
          navigate("/admin");
        } else if (userInfo.role === "Primary User") {
          navigate("/primary-user");
        } else if (userInfo.role === "Member") {
          navigate("/member");
        }
      } else {
      }
    } else {
      console.log("in the login jsx else loop");
      navigate("/login");
    }
  }, [userInfo, loginToken]);

  let onSubmitData = (data) => {
    // console.log(data);

    dispatch(loginUser(data));
    // console.log("in submit", loginToken);
    // navigate("/home");
    // reset();
  };

  return (
    <div id="login">
      {/* <h3>in login page</h3> */}
      <div className="row py-4">
        <div className="col-7">
          <div className="hero">
            <img src="images/exoenses_model.png" />
          </div>

          <div>
            <h2 className="hero-text">Let Us Help You, Manage Your Expense</h2>
          </div>
          {/* <div className="danger">
            {userInfo.isActive === false
              ? logninDeclined("Login declined,Contact to admin")
              : // <ToastContainer
                // // position="bottom-left"
                // // autoClose={5000}
                // // closeOnClick
                // />
                ""}
          </div> */}
        </div>
        <div className="col-5">
          <div className="login-form justify-content-center align-items-center">
            <div>
              <img src="images/expenses_name.png" />
            </div>
            <form onSubmit={handleSubmit(onSubmitData)} className="form-page">
              <h4 className="header-register mb-4" htmlFor="nameIn">
                Log In
              </h4>
              <div>
                <label htmlFor="email" className="my-1">
                  Email
                </label>

                <input
                  className="form-control bar"
                  type={"email"}
                  {...register("email")}
                  id="email"
                  required
                />
                <p>{errors.email?.message}</p>
              </div>
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
                LOGIN
              </button>
              <div className="info">
                <p className="rigth py-2">
                  <span className="loginLink">
                    <Link to="/forgetpassword">Forget Password</Link>
                  </span>
                </p>
                <p>
                  Are you a new user?
                  <span className="">
                    <Link to="/register">Sign Up</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
