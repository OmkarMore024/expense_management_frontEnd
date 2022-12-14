import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../actions/usersAction";
import { Link } from "react-router-dom";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BsFillCircleFill } from "react-icons/bs";

export default function Users() {
  const users = useSelector((state) => state.userReducer.users);

  const dispatch = useDispatch();
  const [titleName, setTitleName] = useState("");

  useEffect(() => {
    dispatch(getAllUsers({ titleName }));
  }, [titleName]);

  const handleDelete = (id) => {
    // console.log("in handle delete for user");
    dispatch(deleteUser(id));
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
            className="shadow px-2 py-1 my-3 bg-body rounded outline-none"
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
            <th className="" scope="">
              No
            </th>
            <th className="">User Name</th>
            <th className="">Role</th>
            <th className="action">Action</th>
            {/* <th className="w-1/4 ...">Views</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1} </td>
                <td>
                  {user.isActive ? (
                    <BsFillCircleFill className="inline-block text-success w-2" />
                  ) : (
                    <BsFillCircleFill className="inline-block text-danger w-2" />
                  )}{" "}
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.role}</td>
                <td>
                  <div className="action-sym">
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
