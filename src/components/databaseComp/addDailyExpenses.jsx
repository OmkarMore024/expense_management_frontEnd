import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getAllExpenseTypes } from "../actions/expenseTypeAction";
import {
  getCurrentPeriodicExpense,
  updatePeriodicPayment,
} from "../actions/paymentDetailsAction";
import { getPrimarysHouseHolds } from "../actions/houseHoldAction";
import {
  addDaliyExpense,
  getCurrentDailyExpense,
  updateDaliyExpense,
} from "../actions/dailyExpenseAction";
import { getHouseHoldByMemberid } from "../actions/membersAction";

export function dailyExpenseLoader({ params }) {
  const dailyExpenseId = params.dailyExpenseId;
  return dailyExpenseId;
}

const schema = yup.object().shape({
  //   paymentDetails: {
  householdId: yup.string().min(3).max(30).required(),
  expensetypeId: yup.string().min(3).max(30).required(),
  amount: yup.number(),
  date: yup.date(),
  method: yup.string().min(3).max(20),
  paidThrough: yup.string().min(3).max(30).required(),
  paidBy: yup.string().min(3).max(30).required(),
  description: yup.string().min(3).max(300).required(),

  //   amount: yup.number().required(),
});

export default function EditDailyExpenses() {
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
  const dailyExpense = useSelector(
    (state) => state.dailyExpenseReducer.currentExpense
  );
  const households = useSelector((state) => state.houseHoldReducer.houseHolds);
  const expenses = useSelector((state) => state.expenseTypeReducer.expenses);

  let memberHouseHold = useSelector((state) => state.memberReducer.houseHolds);

  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const dailyExpenseId = useLoaderData();
  // console.log(dailyExpenseId);
  let link;
  useEffect(() => {
    // dispatch(getAllMembers());
    // dispatch(getPrimarysHouseHolds(dailyExpenseId));
    dispatch(getAllExpenseTypes());
    if (userInfo.role === "Member") {
      link = "member";
      dispatch(getHouseHoldByMemberid(userInfo._id));
    } else if (userInfo.role === "Primary User") {
      link = "primary-user";
      dispatch(getPrimarysHouseHolds(userInfo._id));
    }
  }, [dailyExpense._id]);

  let newArr = [];
  function getDailyExpensesInFrontEnd() {
    link = "member";
    if (userInfo.role === "Member") {
      memberHouseHold.map((hh) => {
        newArr.push(hh.houseHold);
      });
    } else {
      link = "primary-user";
      households.map((hh) => {
        newArr.push(hh);
      });
    }
  }
  getDailyExpensesInFrontEnd();

  useEffect(() => {
    if (!dailyExpenseId) return;
    dispatch(getCurrentDailyExpense(dailyExpenseId));
    // console.log(dailyExpense);
    setValue("description", dailyExpense.description);
    setValue("amount", dailyExpense.paymentDetails.amount);
    setValue("method", dailyExpense.paymentDetails.method);
    setValue("date", dailyExpense.paymentDetails.date);
    setValue("paidBy", dailyExpense.paidBy);
    setValue("paidThrough", dailyExpense.paidThrough);
    setValue("householdId", dailyExpense.household._id);
    setValue("expensetypeId", dailyExpense.expensetype._id);
    setValue("_id", dailyExpense._id);
  }, [dailyExpense._id]);

  let onSubmitData = (data) => {
    data.paymentDetails = {
      amount: data.amount,
      date: data.date,
      method: data.method,
    };
    delete data.amount;
    delete data.date;
    delete data.method;
    console.log(data);
    if (dailyExpenseId) {
      console.log("update");
      dispatch(updateDaliyExpense(data));
      navigate(`/${link}/dailyexpense`);
    } else {
      console.log("add");
      dispatch(addDaliyExpense(data));
      navigate(`/${link}/dailyexpense`);
      //   navigate("/primary-user/dailyexpense");
    }
  };
  return (
    <div>
      <div className="household justify-content-center align-items-center m-2">
        <form onSubmit={handleSubmit(onSubmitData)}>
          <div className="addHousehold">
            <h3 className="household-title">Add/update daily Expense</h3>
            <div className="row">
              <div className="col-6">
                <label htmlFor="addressline1" className="m-2">
                  Choose household
                </label>
                <select
                  className="form-select m-2"
                  aria-label="Default select example"
                  {...register("householdId")}
                >
                  <option value={"all"}>select</option>
                  {newArr.map((household) => {
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
                <label htmlFor="datePayment" className="m-2">
                  payment date
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"date"}
                  placeholder="Enter paid date"
                  {...register("date")}
                  id="datePayment"
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="method" className="m-2">
                  method
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter method name"
                  {...register("method")}
                  id="method"
                  required
                />
                <p>{errors.method?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="amount" className="m-2">
                  amount
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter amount name"
                  {...register("amount")}
                  id="amount"
                  required
                />
                <p>{errors.amount?.message}</p>
              </div>
              <div className="col-6">
                <label htmlFor="paidBy" className="m-2">
                  paidBy
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter paidBy name"
                  {...register("paidBy")}
                  id="paidBy"
                  required
                />
                <p>{errors.paidBy?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="paidThrough" className="m-2">
                  PaidThrough
                </label>
                <input
                  className="form-control m-2 bar"
                  type={"text"}
                  placeholder="Enter paidThrough"
                  {...register("paidThrough")}
                  id="paidThrough"
                  required
                />
                <p>{errors.paidThrough?.message}</p>
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
