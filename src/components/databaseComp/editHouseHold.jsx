import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addHouseHold,
  getCurrentHouseHold,
  updateHouseHold,
} from "../actions/houseHoldAction";

export function houseHoldLoader({ params }) {
  const houseHoldId = params.houseHoldId;
  console.log(houseHoldId);
  return houseHoldId;
}

const schema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
  addressLine1: yup.string().min(3).max(30).required(),
  addressLine2: yup.string().min(3).max(30).required(),
  area: yup.string().min(3).max(20).required(),
  city: yup.string().min(3).max(20).required(),
  state: yup.string().min(3).max(20).required(),
  zipcode: yup.string().min(3).max(20).required(),
  createdBy: yup.string(),
});

export default function EditHouseHold() {
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
  const household = useSelector(
    (state) => state.houseHoldReducer.currentHouseHold
  );

  const userInfo = useSelector((state) => state.loginReducer.userInfo);
  const houseHoldId = useLoaderData();
//   console.log(houseHoldId);

  React.useEffect(() => {
    if (!houseHoldId) return;

    dispatch(getCurrentHouseHold(houseHoldId));

    console.log("in edit household", household);

    setValue("name", household.name);
    setValue("state", household.state);
    setValue("addressLine2", household.addressLine2);
    setValue("addressLine1", household.addressLine1);
    setValue("zipcode", household.zipcode);
    setValue("city", household.city);
    setValue("area", household.area);
    setValue("_id", household._id);
  }, [household._id]);

  let onSubmitData = (data) => {
    console.log(data);
    if (data._id) {
      console.log("update");
      dispatch(updateHouseHold(data));
      navigate("/primary-user/households");
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
            <h3 className="household-title">Update user profile</h3>
            <div className="row">
              <div className="col-6">
                {" "}
                <label htmlFor="expenseIn" className="m-2">
                  Household-Name
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter houdehold name"
                  {...register("name")}
                  id="expenseIn"
                  required
                />
                <p>{errors.name?.message}</p>
              </div>
              <div className="col-6">
                {" "}
                <label htmlFor="addressline1" className="m-2">
                  Addressline-1
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter addressline name"
                  {...register("addressLine1")}
                  id="addressline1"
                  required
                />
                <p>{errors.addressLine1?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="addressLine2" className="m-2">
                  Addressline-2
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter addressline-2 "
                  {...register("addressLine2")}
                  id="addressLine2"
                  required
                />
                <p>{errors.addressLine2?.message}</p>
              </div>
              <div className="col-6">
                <label htmlFor="area" className="m-2">
                  Area
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter area name"
                  {...register("area")}
                  id="area"
                  required
                />
                <p>{errors.area?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="state" className="m-2">
                  state
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter state name"
                  {...register("state")}
                  id="state"
                  required
                />
                <p>{errors.state?.message}</p>
              </div>
              <div className="col-6">
                <label htmlFor="zipcode" className="m-2">
                  zipcode
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter zipcode"
                  {...register("zipcode")}
                  id="zipcode"
                  required
                />
                <p>{errors.zipcode?.message}</p>
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="city" className="m-2">
                city
              </label>
              <input
                className="form-control m-2 bar"
                type={"text"}
                placeholder="Enter addressline name"
                {...register("city")}
                id="city"
                required
              />
              <p>{errors.city?.message}</p>
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
