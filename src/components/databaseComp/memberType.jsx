import { useSelector } from "react-redux";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getPrimarysHouseHolds } from "../actions/houseHoldAction";
import {
  deleteHouseHoldMember,
  getAllMembers,
  getAllMembersBypfs,
  getHouseHoldmembers,
} from "../actions/membersAction";

export default function Members() {
  const households = useSelector((state) => state.houseHoldReducer.houseHolds);
  const userInfo = useSelector((state) => state.loginReducer.userInfo);
  const members = useSelector((state) => state.memberReducer.members);
  const [houseHoldName, setHouseHoldName] = useState("");

  //   console.log("in members check:", members);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteHouseHoldMember(id));
  };
  let newArr = [];

  useEffect(() => {
    dispatch(getPrimarysHouseHolds(userInfo._id));
    dispatch(getAllMembersBypfs({ houseHoldName }));
    // households.map((houseHold) => {
    //   console.log("---", houseHold._id);
    //   dispatch(getHouseHoldmembers(houseHold._id));
    //   newArr.push(households);
    // });
  }, [members]);
  //   console.log("in sss", newArr);
  const handleSearch = ({ target }) => {
    console.log(target.value);
    setHouseHoldName(target.value);
    dispatch(getAllMembersBypfs({ houseHoldName }));
  };

  //   useEffect(() => {}, []);

  return (
    <div>
      <div className="row">
        <div className="col-6 searchBox">
          <input
            type={"text"}
            placeholder="Search"
            className="shadow px-2 py-1 my-3 bg-body rounded"
            onChange={handleSearch}
          />
        </div>
        <div className="col-6 symDiv">
          <Link to="/primary-user/members/addmember">
            <MdAddCircle className="addSym my-3" />
          </Link>
        </div>
      </div>
      <table>
        <thead>
          <tr className="" key={"search and action"}>
            <th className="">Members</th>
            <th className="">HouseHold</th>
            <th className="">Action</th>
            {/* <th className="w-1/4 ...">Views</th> */}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => {
            return (
              <tr key={member._id}>
                <td>
                  {index + 1} {member.user.userName}
                </td>
                <td>{member.houseHold.name}</td>
                <td>
                  <div>
                    <MdOutlineModeEditOutline className="svg-round" />
                    <MdOutlineDelete
                      className="svg-round"
                      onClick={() => handleDelete(member._id)}
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
