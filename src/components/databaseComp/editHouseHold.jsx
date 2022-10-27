import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addHouseHold } from "../actions/houseHoldAction";

export function expenseLoader({ params }) {
  const expenseId = params.expenseId;
  return expenseId;
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
  const households = useSelector((state) => state.houseHoldReducer.houseHolds);

  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const houseHoldId = useLoaderData();
  //   return <h2>houseHold form</h2>;
  console.log(houseHoldId);

//   React.useEffect(() => {
//     if (!houseHoldId) return;

//     setValue("name", households.name);
//     setValue("state", households.state);
//     setValue("_id", household._id);
//   }, [household._id]);

  let onSubmitData = (data) => {
    console.log(data);
    if (data._id) {
      console.log("update");
      // dispatch(updateexpense(data));
      navigate("/expenses");
    } else {
      data.createdBy = userInfo._id;
      dispatch(addHouseHold(data));
      navigate("/primary-user/households");
      console.log("add");
    }
  };
  return (
    <div>
      <div className="expense justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmitData)}>
          {/* <h4>in add expense page</h4> */}

          <div className="addexpense">
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
            <label htmlFor="state" className="m-2">
state            </label>
            <input
              className="form-control m-2 bar"
              type={"text"}
              placeholder="Enter state name"
              {...register("state")}
              id="state"
              required
            />
            <p>{errors.state?.message}</p>
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
            <button type="submit" className="btn btn-light m-2 ">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
