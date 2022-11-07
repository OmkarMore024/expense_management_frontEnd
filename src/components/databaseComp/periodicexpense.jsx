import { useSelector } from "react-redux";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getPrimarysHouseHolds } from "../actions/houseHoldAction";
import { getAllPeriodicPayment } from "../actions/paymentDetailsAction";
import { getHouseHoldByMemberid } from "../actions/membersAction";
import { HiOutlineSearch } from "react-icons/hi";
// import { type } from "@testing-library/user-event/dist/type";

export default function PeriodicExpense() {
  const userInfo = useSelector((state) => state.loginReducer.userInfo);
  const paymentDetails = useSelector(
    (state) => state.paymentDetailsReducer.paymentDetails
  );
  let households = useSelector((state) => state.houseHoldReducer.houseHolds);
  let memberHouseHold = useSelector((state) => state.memberReducer.houseHolds);

  //for searching
  const [titleName, setTitleName] = useState("");
  const [lastDate, setLastDate] = useState("");
  const dispatch = useDispatch();

  const dateFequency = [
    { title: "Today", date: 0 },
    { title: "Yesteday", date: 1 },
    { title: "Last 7 days", date: 7 },
    { title: "Last Month", date: 31 },
    { title: "Last 6 Month", date: 183 },
    { title: "Last year", date: 365 },
  ];
  useEffect(() => {
    dispatch(getAllPeriodicPayment(titleName, lastDate));

    if (userInfo.role === "Member") {
      dispatch(getHouseHoldByMemberid(userInfo._id));
      // households = [...memberHouseHold];
    } else if (userInfo.role === "Primary User") {
      dispatch(getPrimarysHouseHolds(userInfo._id));
    }
  }, [titleName]);

  let newArr = [];

  const funDateSeacrh = (newArr) => {
    let dateArr = [];
    console.log("in fucntion of date");
    if (lastDate) {
      newArr.map((pd) => {
        if (pd.paymentDetails.length !== 0) {
          let mydate = new Date(
            pd.paymentDetails[pd.paymentDetails.length - 1].date
          );
          console.log(new Date(Date.now()) >= mydate && mydate >= lastDate);
          if (new Date(Date.now()) >= mydate && mydate >= lastDate)
            dateArr.push(pd);
        }
      });
    }
    // console.log(dateArr);
    return dateArr;
  };

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
    if (lastDate) {
      newArr = funDateSeacrh(newArr);
    }
    // console.log(newArr);
  }
  getHouseHoldInFrontEnd();

  // funDateSeacrh(newArr);

  const handleDelete = (id) => {
    // dispatch(deleteHouseHoldMember(id));
  };

  const handleSearch = ({ target }) => {
    setTitleName(target.value.trim());
    dispatch(getAllPeriodicPayment(titleName, lastDate));
  };

  const handleDateFilter = ({ target }) => {
    // console.log(
    //   typeof new Date(Date.now() - target.value * 86400000).toISOString()
    // );
    if (target.value !== "all") {
      console.log(target.value);
      setLastDate(new Date(Date.now() - target.value * 86400000));
    } else {
      setLastDate("");
    }
    dispatch(getAllPeriodicPayment(titleName, lastDate));
  };

  return (
    <div>
      <div className="row">
        <div className="col-6 searchBox">
          <input
            type={"text"}
            placeholder="Search"
            className="shadow px-2 py-1 my-3 bg-body outline-none"
            onChange={handleSearch}
          />
          {/* <HiOutlineSearch /> */}
        </div>

        <div className="col-6 symDiv">
          <div className="button-flex">
            {userInfo.role === "Primary User" ? (
              <div className="flex justify-between">
                <select className="filter" onChange={handleDateFilter}>
                  <option value={"all"} key={"all"}>
                    All Data
                  </option>
                  {dateFequency.map((f) => {
                    return (
                      <option value={f.date} key={f.title}>
                        {f.title}
                      </option>
                    );
                  })}
                </select>
                <Link to="/primary-user/periodicexpense/addperiodicexpenses">
                  <MdAddCircle className="addSym my-3" />
                </Link>
              </div>
            ) : (
              <span></span>
              // <span>Members can only Pay/update the payment</span>
            )}
          </div>
        </div>
      </div>
      {newArr.length === 0 ? (
        <div className="NoData">No Data found in Database</div>
      ) : (
        <table>
          <thead>
            <tr className="" key={"search and action"}>
              <th className="" scope="col">
                Duedate
              </th>
              <th className="">HouseHold</th>
              <th className="">Expense type</th>
              <th className="">paid by</th>
              <th className="action">Action</th>
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
                  <td>{paymentDetail.paidBy.map((p) => p + ",")}</td>
                  <td>
                    {userInfo.role === "Primary User" ? (
                      <div className="action-sym">
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
                          to={`/member/periodicexpense/${paymentDetail._id}`}
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
