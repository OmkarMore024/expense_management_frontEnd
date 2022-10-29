import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addHouseHold,
  getPrimarysHouseHolds,
} from "../actions/houseHoldAction";
import { addMember, getAllMembers } from "../actions/membersAction";
import { getAllUsers } from "../actions/usersAction";

export function expenseLoader({ params }) {
  const expenseId = params.expenseId;
  return expenseId;
}

const schema = yup.object().shape({
  householdId: yup.string().min(3).max(30).required(),
  userId: yup.string().min(3).max(30).required(),
});

export default function EditMember() {
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
  const members = useSelector((state) => state.userReducer.users);

  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const houseHoldId = useLoaderData();
  console.log(houseHoldId);

  useEffect(() => {
    // dispatch(getAllMembers());
    dispatch(getAllUsers());
    dispatch(getPrimarysHouseHolds(userInfo._id));
  }, []);
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
      navigate("/primary-user/members");
    } else {
      dispatch(addMember(data));
      navigate("/primary-user/members");
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
                  Household-Name
                </label>
                <select
                  className="form-select m-2"
                  aria-label="Default select example"
                  {...register("householdId")}
                >
                  <option value={"all"}>select</option>
                  {households.map((household) => {
                    return (
                      <option value={household._id} key={household._id}>
                        {household.name}
                      </option>
                    );
                  })}
                </select>
                <p>{errors.name?.message}</p>
              </div>
              <div className="col-6">
                {" "}
                <label htmlFor="addressline1" className="m-2">
                  choose member
                </label>
                <select
                  className="form-select m-2"
                  aria-label="Default select example"
                  {...register("userId")}
                >
                  <option value={"all"}>select</option>
                  {members.map((member) => {
                    return (
                      <option value={member._id} key={member._id}>
                        {member.firstName} {member.lastName}
                      </option>
                    );
                  })}
                </select>
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
