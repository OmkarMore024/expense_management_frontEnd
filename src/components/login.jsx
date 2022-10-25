import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./actions/loginAction";

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
  

  // const loginToken = useSelector((state) => state.loginReducer.token);

  // console.log("in login.jsx" + loginToken);

  let onSubmitData = (data) => {
    //setting default primary user\
    // data.role = "Primary User";
    console.log(data);
    // console.log({ data });

    dispatch(loginUser(data));
    navigate("/home");
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
                <p className="rigth py-2">Forget Password</p>
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
