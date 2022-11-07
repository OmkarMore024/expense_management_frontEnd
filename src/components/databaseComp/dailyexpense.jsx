import { useEffect, useState } from "react";
import {
  deleteDailyExpense,
  getAllDailyExpenses,
} from "../actions/dailyExpenseAction";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { MdAddCircle } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getPrimarysHouseHolds } from "../actions/houseHoldAction";
import { getHouseHoldByMemberid } from "../actions/membersAction";

export default function DailyExpense() {
  const dailyExpenses = useSelector(
    (state) => state.dailyExpenseReducer.dailyExpenses
  );
  const [titleName, setTitleName] = useState("");

  const userInfo = useSelector((state) => state.loginReducer.userInfo);
  const households = useSelector((state) => state.houseHoldReducer.houseHolds);
  let memberHouseHold = useSelector((state) => state.memberReducer.houseHolds);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDailyExpenses(titleName));

    if (userInfo.role === "Member") {
      dispatch(getHouseHoldByMemberid(userInfo._id));
      // households = [...memberHouseHold];
    } else if (userInfo.role === "Primary User") {
      dispatch(getPrimarysHouseHolds(userInfo._id));
    }
  }, [titleName]);

  let newArr = [];
  let link;
  function getDailyExpensesInFrontEnd() {
    link = "member";
    if (userInfo.role === "Member") {
      memberHouseHold.map((hh) => {
        dailyExpenses.forEach((pd) => {
          if (hh.houseHold._id === pd.household._id) {
            newArr.push(pd);
          }
        });
      });
    } else {
      link = "primary-user";
      households.map((hh) => {
        // console.log(dailyExpenses);
        dailyExpenses.forEach((pd) => {
          if (hh._id === pd.household._id) {
            // console.log(pd);
            newArr.push(pd);
          }
        });
      });
    }
    // console.log("in fun get:" + link);
  }
  getDailyExpensesInFrontEnd();

  const handleDelete = (id) => {
    dispatch(deleteDailyExpense(id));
  };
  const handleSearch = ({ target }) => {
    setTitleName(target.value);
    dispatch(getAllDailyExpenses(titleName));
  };
  return (
    <div>
      <div className="row">
        <div className="col-6 searchBox">
          <input
            type={"text"}
            placeholder="Search"
            className="shadow px-2 py-1 my-3 bg-body rounded outline-none"
            onChange={handleSearch}
          />
        </div>
        <div className="col-6 symDiv">
          <div className="flex justify-between">
            <span className="px-2 py-2 shadow rounded h-9 m-3">
              Total Expenditure: <b className="text-danger">₹</b>
              {newArr.reduce((total, dx) => {
                return total + dx.paymentDetails.amount;
              }, 0)}
            </span>

            <Link to={`/${link}/dailyexpense/adddailyexpense`}>
              <MdAddCircle className="addSym my-3 mx-3" />
            </Link>
          </div>
        </div>
      </div>
      {newArr.length === 0 ? (
        <div className="NoData">No Data found in Database</div>
      ) : (
        <table>
          <thead>
            <tr className="" key={"search and action"}>
              <th className="">PaidDate</th>
              <th className="">Expense type</th>
              <th className="">HouseHold</th>
              <th className="">Amount</th>
              <th className="action">Action</th>
              {/* <th className="w-1/4 ...">Views</th> */}
            </tr>
          </thead>
          <tbody>
            {newArr.map((dailyExpense, index) => {
              return (
                <tr key={dailyExpense._id}>
                  <td>
                    {index + 1})
                    {new Date(
                      dailyExpense.paymentDetails.date
                    ).toLocaleDateString()}
                  </td>
                  <td>{dailyExpense.expensetype.name}</td>
                  <td>{dailyExpense.household.name}</td>
                  <td>₹ {dailyExpense.paymentDetails.amount}</td>
                  <td>
                    <div className="action-sym">
                      <Link to={`/${link}/dailyexpense/${dailyExpense._id}`}>
                        <MdOutlineModeEditOutline className="svg-round" />
                      </Link>
                      <MdOutlineDelete
                        className="svg-round"
                        onClick={() => handleDelete(dailyExpense._id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
