import { useSelector } from "react-redux";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getPrimarysHouseHolds } from "../actions/houseHoldAction";
import { getAllPeriodicPayment } from "../actions/paymentDetailsAction";
import { getHouseHoldByMemberid } from "../actions/membersAction";

export default function PeriodicExpense() {
  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const paymentDetails = useSelector(
    (state) => state.paymentDetailsReducer.paymentDetails
  );
  let households = useSelector((state) => state.houseHoldReducer.houseHolds);
  let memberHouseHold = useSelector((state) => state.memberReducer.houseHolds);
  // console.log(households);
  const dispatch = useDispatch();
  console.log(memberHouseHold);
  // console.log(paymentDetails.map((pd)=>pd.dueDate.getMonth()));
  useEffect(() => {
    dispatch(getAllPeriodicPayment());

    if (userInfo.role === "Member") {
      dispatch(getHouseHoldByMemberid(userInfo._id));
      // households = [...memberHouseHold];
    } else if (userInfo.role === "Primary User") {
      dispatch(getPrimarysHouseHolds(userInfo._id));
    }
  }, []);

  let newArr = [];
  function getHouseHoldInFrontEnd() {
    if (userInfo.role === "Member") {
      memberHouseHold.map((hh) => {
        paymentDetails.forEach((pd) => {
          if (hh.houseHold._id === pd.household._id) {
            newArr.push(pd);
          }
        });
      });
    } else {
      households.map((hh) => {
        paymentDetails.forEach((pd) => {
          if (hh._id === pd.household._id) {
            newArr.push(pd);
          }
        });
      });
    }
  }
  getHouseHoldInFrontEnd();
  console.log(newArr);
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
          <div className="button-flex">
            {userInfo.role === "Primary User" ? (
              <Link to="/primary-user/periodicexpense/addperiodicexpenses">
                <MdAddCircle className="addSym my-3" />
              </Link>
            ) : (
              <span></span>
              // <span>Members can only Pay/update the payment</span>
            )}
          </div>
        </div>
      </div>
      {newArr.length === 0 ? (
        <div className="">No Data found in Database</div>
      ) : (
        <table>
          <thead>
            <tr className="" key={"search and action"}>
              <th className="">Duedate</th>
              <th className="">HouseHold</th>
              <th className="">Expense type</th>
              <th className="">paid by</th>
              <th className="">Action</th>
              {/* <th className="w-1/4 ...">Views</th> */}
            </tr>
          </thead>
          <tbody>
            {newArr.map((paymentDetail, index) => {
              return (
                <tr key={paymentDetail._id}>
                  <td>
                    {index + 1}.{" "}
                    {new Date(paymentDetail.dueDate).toLocaleDateString()}
                  </td>
                  <td>{paymentDetail.household.name}</td>
                  <td>{paymentDetail.expensetype.name}</td>
                  <td>{paymentDetail.paidBy.map((p) => p)}</td>
                  <td>
                    {userInfo.role === "Primary User" ? (
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
                    ) : (
                      <div>
                        <Link
                          to={`//periodicexpense/${paymentDetail._id}`}
                        >
                          <MdOutlineModeEditOutline className="svg-round" />
                        </Link>
                      </div>
                    )}
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
