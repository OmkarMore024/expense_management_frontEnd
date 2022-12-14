import { useSelector } from "react-redux";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  getAllHouseHolds,
  getPrimarysHouseHolds,
} from "../actions/houseHoldAction";
import { useState } from "react";

export default function HouseHold() {
  const households = useSelector((state) => state.houseHoldReducer.houseHolds);
  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const [titleName, setTitleName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllHouseHolds());
    dispatch(getPrimarysHouseHolds(userInfo._id, titleName));
  }, [titleName]);

  const handleSearch = ({ target }) => {
    setTitleName(target.value.trim());
    dispatch(getPrimarysHouseHolds(userInfo._id, titleName));
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
          <Link to="/primary-user/households/addhousehold">
            <MdAddCircle className="addSym my-3" />
          </Link>
        </div>
      </div>
      {households.length === 0 ? (
        <div className="NoData">No Data found in Database</div>
      ) : (
        <table>
          <thead>
            <tr className="" key={"search and action"}>
              <th className="">HouseHold</th>
              <th className="action">Action</th>
              {/* <th className="w-1/4 ...">Views</th> */}
            </tr>
          </thead>
          <tbody>
            {households.map((household, index) => {
              return (
                <tr key={household._id}>
                  <td>
                    {index + 1} {household.name}
                  </td>
                  <td>
                    <div className="action-sym">
                      <Link to={`/primary-user/households/${household._id}`}>
                        <MdOutlineModeEditOutline className="svg-round" />
                      </Link>
                      <MdOutlineDelete
                        className="svg-round"
                        //   onClick={() => handleDelete(household._id)}
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
