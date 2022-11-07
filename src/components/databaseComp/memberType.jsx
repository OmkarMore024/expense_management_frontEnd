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
  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const households = useSelector((state) => state.houseHoldReducer.houseHolds);

  const members = useSelector((state) => state.memberReducer.members);
  const houseHoldFromMember = useSelector(
    (state) => state.memberReducer.houseHolds
  );
  const [houseHoldName, setHouseHoldName] = useState("");

  //   console.log("in members check:", members);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteHouseHoldMember(id));
  };

  //for getting the memebers for that pert
  let membersNewArr = [];
  function getMembersInFrontEnd() {
    households.map((hh) => {
      members.forEach((mem) => {
        if (hh._id === mem.houseHold._id) {
          membersNewArr.push(mem);
        }
      });
    });
  }
  getMembersInFrontEnd();

  useEffect(() => {
    dispatch(getPrimarysHouseHolds(userInfo._id));
    // console.log(households);
    dispatch(getAllMembersBypfs({ houseHoldName }));
  }, [houseHoldName]);

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
            className="shadow px-2 py-1 my-3 bg-body rounded outline-none"
            onChange={handleSearch}
          />
        </div>
        <div className="col-6 symDiv">
          <Link to="/primary-user/members/addmember">
            <MdAddCircle className="addSym my-3" />
          </Link>
        </div>
      </div>
      {membersNewArr.length === 0 ? (
        <div className="NoData">No Data found in Database</div>
      ) : (
        <table>
          <thead>
            <tr className="" key={"search and action"}>
              <th className="">Members</th>
              <th className="">HouseHold</th>
              <th className="action">Action</th>
              {/* <th className="w-1/4 ...">Views</th> */}
            </tr>
          </thead>
          <tbody>
            {membersNewArr.map((member, index) => {
              return (
                <tr key={member._id}>
                  <td>
                    {index + 1} {member.user.userName}
                  </td>
                  <td>{member.houseHold.name}</td>
                  <td>
                    <div className="action-sym">
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
      )}
    </div>
  );
}
