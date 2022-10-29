import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getAllExpenseTypes } from "../actions/expenseTypeAction";
import { getCurrentPeriodicExpense, updatePeriodicPayment } from "../actions/paymentDetailsAction";

export function periodicPaymentLoader({ params }) {
  const periodicPaymentId = params.periodicPaymentId;
  return periodicPaymentId;
}

const schema = yup.object().shape({
  //   paymentDetails: {
  amount: yup.number(),
  date: yup.date(),
  method: yup.string().min(3).max(20),

  paidThrough: yup.string().min(3).max(30).required(),
  paidBy: yup.string().min(3).max(300).required(),
  dueDate: yup.date().required(),
  //   amount: yup.number().required(),
});

export default function UpdatePeriodicPayment() {
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
  const periodicPayment = useSelector(
    (state) => state.paymentDetailsReducer.currentPayment
  );
  const expenses = useSelector((state) => state.expenseTypeReducer.expenses);
  const members = useSelector((state) => state.userReducer.users);

  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const periodicPaymentId = useLoaderData();
  console.log(periodicPaymentId);

  useEffect(() => {
    // dispatch(getAllMembers());
    // dispatch(getAllUsers());
    // dispatch(getPrimarysHouseHolds(userInfo._id));
    // dispatch(getAllExpenseTypes());
  }, []);

  useEffect(() => {
    if (!periodicPaymentId) return;
    dispatch(getCurrentPeriodicExpense(periodicPaymentId));

    setValue("dueDate", periodicPayment.dueDate);
    // setValue("amount", periodicPayment.paymentDetails.amount);
    // setValue("method", periodicPayment.paymentDetails.method);
    // setValue("date", periodicPayment.paymentDetails.date);
    // setValue("paidBy", periodicPayment.paidBy);
    // setValue("paidThrough", periodicPayment.paidThrough);
    setValue("_id", periodicPayment._id);
  }, [periodicPayment._id]);

  let onSubmitData = (data) => {
    data.paymentDetails = {
      amount: data.amount,
      date: data.date,
      method: data.method,
    };

    // data["paymentDetails.amount"] =;
    // data["paymentDetails.date"] =data.date;
    // data["paymentDetails.method"] =data.method;
    delete data.amount;
    delete data.date;
    delete data.method;
    console.log(data);
    if (data._id) {
      console.log("update");
      dispatch(updatePeriodicPayment(data));
      navigate("/primary-user/periodicexpense");
    } else {
      console.log("add");
    }
  };
  return (
    <div>
      <div className="household justify-content-center align-items-center m-2">
        <form onSubmit={handleSubmit(onSubmitData)}>
          <div className="addHousehold">
            <h3 className="household-title">Pay/update Periodic Payment</h3>
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
                  paidThrough in Rs.
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
                <label htmlFor="date" className="m-2">
                  Next payment date
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
