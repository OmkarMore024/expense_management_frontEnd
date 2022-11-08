import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  //   addexpenses,
  getPrimarysHouseHolds,
} from "../actions/houseHoldAction";
import { getAllExpenseTypes } from "../actions/expenseTypeAction";
import { addPeriodicExpense } from "../actions/paymentDetailsAction";


const schema = yup.object().shape({
  householdId: yup.string().min(3).max(30).required(),
  expensetypeId: yup.string().min(3).max(30).required(),
  frequency: yup.string().min(3).max(30).required(),
  description: yup.string().min(3).max(300).required(),
  dueDate: yup.date().required(),
  amount: yup.number().required(),
});

export default function EditPeriodicPayment() {
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
  const expenses = useSelector((state) => state.expenseTypeReducer.expenses);
  const members = useSelector((state) => state.userReducer.users);

  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  useEffect(() => {
    // dispatch(getAllMembers());
    // dispatch(getAllUsers());
    dispatch(getPrimarysHouseHolds(userInfo._id));
    dispatch(getAllExpenseTypes());
  }, []);
  //   React.useEffect(() => {
  //     if (!houseHoldId) return;

  //     setValue("name", households.name);
  //     setValue("state", households.state);
  //     setValue("_id", household._id);
  //   }, [household._id]);
  const frequency = ["yearly", "monthly", "weekly"];

  let onSubmitData = (data) => {
    // data.payment = { fdfdd: data.frequency };
    console.log(data);
    if (data._id) {
      console.log("update");
      // dispatch(updateexpense(data));
      navigate("/primary-user/members");
    } else {
      
      dispatch(addPeriodicExpense(data));
      //   console.log(data);
      navigate("/primary-user/periodicexpense");
      console.log("add");
    }
  };
  return (
    <div>
      <div className="household justify-content-center align-items-center m-2">
        <form onSubmit={handleSubmit(onSubmitData)}>
          <div className="addHousehold">
            <h3 className="household-title">Add New Periodic Payment</h3>
            <div className="row">
              <div className="col-6">
               
                <label htmlFor="addressline1" className="m-2">
                  choose household
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
              </div>
              <div className="col-6">
                <label htmlFor="expenseIn" className="m-2">
                  Expense-Name
                </label>
                <select
                  className="form-select m-2"
                  aria-label="Default select example"
                  {...register("expensetypeId")}
                >
                  <option value={"all"}>select</option>
                  {expenses.map((expenses) => {
                    return (
                      <option value={expenses._id} key={expenses._id}>
                        {expenses.name}
                      </option>
                    );
                  })}
                </select>
                <p>{errors.name?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                {" "}
                <label htmlFor="addressline1" className="m-2">
                  Frequency
                </label>
                <select
                  className="form-select m-2"
                  aria-label="Default select example"
                  {...register("frequency")}
                >
                  <option value={"all"}>select</option>
                  {frequency.map((f, index) => {
                    return (
                      <option value={f} key={index}>
                        {f}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="description" className="m-2">
                  description
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter description name"
                  {...register("description")}
                  id="description"
                  required
                />
                <p>{errors.description?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="amount" className="m-2">
                  Amount in Rs.
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter amount"
                  {...register("amount")}
                  id="amount"
                  required
                />
                <p>{errors.amount?.message}</p>
              </div>
              <div className="col-6">
                <label htmlFor="date" className="m-2">
                  Last date
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"date"}
                  placeholder="Enter date"
                  {...register("dueDate")}
                  id="date"
                  required
                />
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
