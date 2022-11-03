import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addHouseHold,
} from "../actions/houseHoldAction";
import { getCurrentUser, updateUser } from "../actions/usersAction";

export function userLoader({ params }) {
  const userId = params.userId;
  //   console.log(userId);
  return userId;
}

const schema = yup.object().shape({
  firstName: yup.string().min(2).max(50).required(),
  lastName: yup.string().min(2).max(50).required(),
  email: yup.string().min(5).max(255).required().email(),
  phone: yup.string().min(7).max(10).required(),
  userName: yup.string().min(5).max(100).required(),
  isActive: yup.boolean().required(),
});

export default function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const households = useSelector((state) => state.houseHoldReducer.houseHolds);
  const user = useSelector((state) => state.userReducer.currentUser);

  const userInfo = useSelector((state) => state.loginReducer.userInfo);
  const userId = useLoaderData();
  //   console.log(houseHoldId);

  React.useEffect(() => {
    if (!userId) return;

    dispatch(getCurrentUser(userId));

    console.log("in edit user", user);

    setValue("name", user.name);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("userName", user.userName);
    setValue("isActive", user.isActive);
    setValue("_id", user._id);
  }, [user._id]);

  let onSubmitData = (data) => {
    console.log(data);
    if (data._id) {
      data.updatedBy = "Admin";
      data.password = user.password;
      console.log("update");
      dispatch(updateUser(data));
      navigate("/admin/users");
    } else {
      data.createdBy = userInfo._id;
      dispatch(addHouseHold(data));
      navigate("/primary-user/households");
      console.log("add");
    }
  };
  return (
    <div>
      <div className="household justify-content-center align-items-center m-2">
        <form onSubmit={handleSubmit(onSubmitData)}>
          <div className="addHousehold">
            <h3 className="household-title">Add New HouseHold</h3>
            <div className="row">
              <div className="col-6">
                {" "}
                <label htmlFor="expenseIn" className="m-2">
                  first-Name
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter houdehold firstName"
                  {...register("firstName")}
                  id="expenseIn"
                  required
                />
                <p>{errors.firstName?.message}</p>
              </div>
              <div className="col-6">
                {" "}
                <label htmlFor="addressline1" className="m-2">
                  last-name
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter addressline name"
                  {...register("lastName")}
                  id="lastName"
                  required
                />
                <p>{errors.lastName?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="email2" className="m-2">
                  email{" "}
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"email"}
                  placeholder="Enter email-2 "
                  {...register("email")}
                  id="email2"
                  required
                />
                <p>{errors.email?.message}</p>
              </div>
              <div className="col-6">
                <label htmlFor="phone" className="m-2">
                  phone
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter phone name"
                  {...register("phone")}
                  id="phone"
                  required
                />
                <p>{errors.phone?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="state" className="m-2">
                  userName
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter userName name"
                  {...register("userName")}
                  id="userName"
                  required
                />
                <p>{errors.userName?.message}</p>
              </div>
              <div className="col-6">
                <div className="isActive-block">
                  <input
                    className="form-check-input  m-2 bar"
                    type="checkbox"
                    // value={true}
                    {...register("isActive")}
                    // checked={user.isActive}
                    id="flexCheckDefault"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    isActive?
                  </label>
                  <p>{errors.isActive?.message}</p>
                </div>
              </div>
            </div>

            <div className="row py-3 ">
              <div className="col-6">
                <button type="submit" className="btn btn-light m-2 ">
                  submit
                </button>
              </div>
              <div className="col-6">
                <button type="reset" className="btn btn-light m-2 ">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
