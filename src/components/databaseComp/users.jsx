import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { getAllUsers } from "../actions/usersAction";
import { Link } from "react-router-dom";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

export default function Users() {
  const users = useSelector((state) => state.userReducer.users);

  const dispatch = useDispatch();
  const [titleName, setTitleName] = useState("");

  useEffect(() => {
    dispatch(getAllUsers({ titleName }));
  }, [titleName]);

  const handleDelete = (id) => {
    console.log("in handle delete for user");
    // dispatch(deleteExpenseType(id));
  };
  const handleSearch = ({ target }) => {
    setTitleName(target.value.trim());
    dispatch(getAllUsers({ titleName }));
    // dispatch(getAllMembersBypfs({ houseHoldName }));
  };

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
        {/* <div className="col-6 symDiv">
          <MdAddCircle className="addSym my-3" />
        </div> */}
      </div>
      <table>
        <thead>
          <tr className="" key={"search and action"}>
            <th className="">No</th>
            <th className="">User Name</th>
            <th className="">Role</th>
            <th className="">Action</th>
            {/* <th className="w-1/4 ...">Views</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1} </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.role}</td>
                <td>
                  <div>
                    <Link to={`/admin/users/${user._id}`}>
                      <MdOutlineModeEditOutline className="svg-round" />
                    </Link>
                    <MdOutlineDelete
                      className="svg-round"
                      onClick={() => handleDelete(user._id)}
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
