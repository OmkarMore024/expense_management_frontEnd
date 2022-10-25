import { getExpenseType, getUsers } from "../services/admin";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  deleteExpenseType,
  getAllExpenseTypes,
} from "../actions/expenseTypeAction";
import { MdAddCircle } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function ExpenseType() {
  const expenses = useSelector((state) => state.expenseTypeReducer.expenses);
  //   console.log(expenses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllExpenseTypes());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteExpenseType(id));
  };
  const handleClick = () => {
    console.log("add btn in expesne");
    // navigate("")
  };

  return (
    <div>
      <div className="row">
        <div className="col-6 searchBox">
          <input
            type={"text"}
            placeholder="Search"
            className="shadow px-2 py-1 my-3 bg-body rounded"
          />
        </div>
        <div className="col-6 symDiv">
          <Link to="/admin/expensetype/addExpenseType">
            <MdAddCircle className="addSym my-3" />
          </Link>
        </div>
      </div>
      <table>
        <thead>
          <tr className="" key={"search and action"}>
            <th className="">Expense Type</th>
            <th className="">Action</th>
            {/* <th className="w-1/4 ...">Views</th> */}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            return (
              <tr key={expense._id}>
                <td>
                  {index + 1} {expense.name}
                </td>
                <td>
                  <div>
                    <MdOutlineModeEditOutline className="svg-round" />
                    <MdOutlineDelete
                      className="svg-round"
                      onClick={() => handleDelete(expense._id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
