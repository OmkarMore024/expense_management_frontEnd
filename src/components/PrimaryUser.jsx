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
          <h4>in primary user</h4>
        </div>
        <nav className="nav border-bottom">
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
