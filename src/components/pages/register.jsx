import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { registerUser } from "../actions/registerAction";
import { FaHtml5, FaUserAlt } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { registerUser } from "../actions/registerAction";

export default function Register() {
  const schema = yup.object().shape({
    firstName: yup.string().min(2).max(50).required(),
    lastName: yup.string().min(3).max(50).required(),
    userName: yup.string().min(5).max(50).required(),
    phone: yup.string().min(8).max(10).required(),

    email: yup.string().min(5).max(255).email().required(),
    role: yup.string().min(3).max(15).required(),
    password: yup.string().min(6).max(1024).required(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  let onSubmitData = (data) => {
    //setting default primary user\

    data.updatedBy = "User";
    console.log(data);
    dispatch(registerUser(data));
    navigate("/login");
    // console.log({ data });
  };

  return (
    <div id="register">
      {/* <h1>In register Page</h1> */}
      <div className="row py-4">
        <div className="col-7">
          <div className="hero">
            <img src="images/expense-guide-1.png" />
          </div>
          <div className="hero-style">
            <h2 className="hero-text">
              Let Us Help You, To Manage<p> Your Expenses</p>
            </h2>
          </div>
        </div>
        <div className="col-5 overflow-auto">
          <div className="register-form justify-content-center align-items-center">
            <div>
              <img src="images/expenses_name.png" />
            </div>
            <form onSubmit={handleSubmit(onSubmitData)} className="form-page ">
              <h4 className="header-register mb-4" htmlFor="nameIn">
                Sign Up
              </h4>
              <div className="info">
                <p className="">
                  Already have an account?
                  <span className="">
                    <Link to="/login">Log In</Link>
                  </span>
                </p>
              </div>
              <div>
                <label htmlFor="fname" className="my-1">
                  FirstName
                </label>
                <input
                  className="form-control bar"
                  type={"text"}
                  {...register("firstName")}
                  id="fname"
                  required
                />
                <p className="text-danger">{errors.firstName?.message}</p>
              </div>
              <div>
                <label htmlFor="lname" className="my-1">
                  Last-name
                </label>
                <input
                  className="form-control bar"
                  type={"text"}
                  // placeholder="Enter username"
                  {...register("lastName")}
                  id="lname"
                  required
                />
                <p className="text-danger">{errors.lastName?.message}</p>
              </div>
              <div>
                <label htmlFor="username" className="my-1">
                  User-name
                </label>
                <input
                  className="form-control bar"
                  type={"text"}
                  {...register("userName")}
                  id="userName"
                  required
                />
                <p className="text-danger">{errors.userName?.message}</p>
              </div>
              <div>
                <label htmlFor="phone" className="my-1">
                  Phone Number
                </label>
                <input
                  className="form-control bar"
                  type={"text"}
                  {...register("phone")}
                  id="phone"
                  required
                />
                <p className="text-danger">{errors.phone?.message}</p>
              </div>
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
                <p className="text-danger">{errors.email?.message}</p>
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
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <div>
                <label htmlFor="roleIn" className="my-1">
                  Role
                </label>
                <select
                  className="form-control bar"
                  aria-label="Default select example"
                  {...register("role")}
                >
                  <option value={"-"}>select</option>
                  <option value={"Primary User"} key={"22"}>
                    {"Primary-user"}
                  </option>
                  <option value={"Member"} key={"23"}>
                    {"Member"}
                  </option>
                </select>
                <p className="text-danger">{errors.role?.message}</p>
              </div>

              <button type="submit" className="btn btn-primary ">
                ADD
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
