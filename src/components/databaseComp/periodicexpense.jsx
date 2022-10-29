import { useSelector } from "react-redux";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getPrimarysHouseHolds } from "../actions/houseHoldAction";
import { getAllPeriodicPayment } from "../actions/paymentDetailsAction";

export default function PeriodicExpense() {
  const paymentDetails = useSelector(
    (state) => state.paymentDetailsReducer.paymentDetails
  );
  const households = useSelector((state) => state.houseHoldReducer.houseHolds);
  // console.log(households);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  // console.log(paymentDetails.map((pd)=>pd.dueDate.getMonth()));
  useEffect(() => {
    dispatch(getAllPeriodicPayment());
    dispatch(getPrimarysHouseHolds(userInfo._id));
  }, []);

  const newArr = paymentDetails.filter((pd) => {
    return households.map((hh) => {
      // console.log(hh._id);
      return hh._id === pd.household._id;
    });
  });
  // console.log(newArr);
  const handleDelete = (id) => {
    // dispatch(deleteHouseHoldMember(id));
  };

  return (
    <div>
      <div className="row">
        <div className="col-6 searchBox">
          <input
            type={"text"}
            placeholder="Search"
            className="shadow px-2 py-1 my-3 bg-body rounded"
            // onChange={handleSearch}
          />
        </div>
        <div className="col-6 symDiv">
          <Link to="/primary-user/periodicexpense/addperiodicexpenses">
            <MdAddCircle className="addSym my-3" />
          </Link>
        </div>
      </div>
      <table>
        <thead>
          <tr className="" key={"search and action"}>
            <th className="">date</th>
            <th className="">HouseHold</th>
            <th className="">Expense type</th>
            <th className="">paid by</th>
            <th className="">Action</th>
            {/* <th className="w-1/4 ...">Views</th> */}
          </tr>
        </thead>
        <tbody>
          {paymentDetails.map((paymentDetail, index) => {
            return (
              <tr key={paymentDetail._id}>
                <td>
                  {index + 1} {paymentDetail.dueDate}
                </td>
                <td>{paymentDetail.household.name}</td>
                <td>{paymentDetail.expensetype.name}</td>
                <td>{paymentDetail.paidBy.map((p) => p)}</td>
                <td>
                  <div>
                    <Link
                      to={`/primary-user/periodicexpense/${paymentDetail._id}`}
                    >
                      <MdOutlineModeEditOutline className="svg-round" />
                    </Link>
                    <MdOutlineDelete
                      className="svg-round"
                      onClick={() => handleDelete(paymentDetail._id)}
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
