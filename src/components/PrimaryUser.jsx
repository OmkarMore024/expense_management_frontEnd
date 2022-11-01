import { NavLink, Outlet } from "react-router-dom";
import SideDashboard from "./side-dashboard";

export default function PrimaryUser() {
  return (
    <div className="row">
      <div className="col-3">
        <SideDashboard />
      </div>
      <div className="col-9">
        <div>
          <h5>
            <i>Primary User DashBoard</i>
          </h5>
        </div>
        <nav className="nav border-bottom">
          <NavLink className="navLinkTable" to="/primary-user/households">
            Households
          </NavLink>
          <NavLink className="navLinkTable" to="/primary-user/members">
            members
          </NavLink>
          <NavLink className="navLinkTable" to="/primary-user/periodicexpense">
            Periodic expense
          </NavLink>
          <NavLink className="navLinkTable" to="/primary-user/dailyexpense">
            Daily expense
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
