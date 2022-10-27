import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  deleteExpenseType,
  getAllExpenseTypes,
} from "../actions/expenseTypeAction";
import { MdAddCircle } from "react-icons/md";
import { getAllUsers } from "../actions/usersAction";

export default function Users() {
  const users = useSelector((state) => state.userReducer.users);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

    const handleDelete = (id) => {
      // dispatch(deleteExpenseType(id));
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
        {/* <div className="col-6 symDiv">
          <MdAddCircle className="addSym my-3" />
        </div> */}
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
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>
                  {index + 1} {user.firstName} {user.lastName}
                </td>
                <td>
                  <div>
                    <MdOutlineModeEditOutline className="svg-round" />
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
