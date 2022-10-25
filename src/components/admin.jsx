import { NavLink, Outlet } from "react-router-dom";
// import Dashboard from "./side-dashboard";
import { MdAddCircle } from "react-icons/md";
import SideDashboard from "./side-dashboard";
import { useSelector } from "react-redux";

export default function Admin() {
  const userInfo = useSelector((state) => state.loginReducer.userInfo);
  console.log("in admin js", userInfo);
  // const handleClick = () => {

  //   console.log("add button if admin");
  // };

  return (
    <div className="row">
      <div className="col-3">
        <SideDashboard firstName={userInfo.userName} />
      </div>
      <div className="col-9">
        <div>
          <div>
            <h4>DashBoard</h4>
          </div>
          <nav className="nav border-bottom">
            <NavLink className="navLinkTable" to="/admin/expensetype">
              Expense Type
            </NavLink>
            <NavLink className="navLinkTable" to="/admin/users">
              Users
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
