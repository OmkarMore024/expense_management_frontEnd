import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseType,
  getCurrentExpenseType,
  updateExpenseType,
} from "../actions/expenseTypeAction";

export function expenseLoader({ params }) {
  const expenseId = params.expenseId;
  return expenseId;
}

export default function EditExpenseType() {
  const schema = yup.object().shape({
    name: yup.string().min(3).max(20).required(),
  });
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

  const expense = useSelector((state) => state.expenseTypeReducer.expenses);
  const currentExpense = useSelector(
    (state) => state.expenseTypeReducer.currentExpense
  );

  const expenseId = useLoaderData();
  //   return <h2>expense form</h2>;
  console.log(expenseId);

  React.useEffect(() => {
    if (!expenseId) return;
    dispatch(getCurrentExpenseType(expenseId));
    console.log("in edit expense", currentExpense);
    // const expense = expenses.find((g) => g._id === expenseId);
    // dispatch(updateexpense(expenseId));
    setValue("name", currentExpense.name);
    setValue("_id", currentExpense._id);
  }, [currentExpense._id]);

  let onSubmitData = (data) => {
    // console.log(data);
    if (data._id) {
      console.log("update");
      dispatch(updateExpenseType(data));
      navigate("/admin/expensetype");
    } else {
      dispatch(addExpenseType(data));
      navigate("/admin/expensetype");
      console.log("add");
    }
  };
  return (
    <div>
      <div className="household justify-content-center align-items-center w-">
        <form onSubmit={handleSubmit(onSubmitData)}>
          <h4 className="household-title">Add Expense type</h4>

          <div className="addexpense">
            <label htmlFor="expenseIn" className="m-2">
              Expense-Name
            </label>
            <input
              className="form-control m-2 bar"
              type={"text"}
              placeholder="Enter expense name"
              {...register("name")}
              id="expenseIn"
              required
            />
            <p>{errors.name?.message}</p>
            <button type="submit" className="btn btn-light m-2 ">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
