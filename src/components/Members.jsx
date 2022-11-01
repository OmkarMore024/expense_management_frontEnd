import { NavLink, Outlet } from "react-router-dom";
import SideDashboard from "./side-dashboard";

export default function Member() {
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <SideDashboard/>
        </div>
        <div className="col-9">
          <div>
          <h5>
            <i>Members DashBoard</i>
          </h5>
          </div>
          <nav className="nav border-bottom">
            <NavLink className="navLinkTable" to="/member/periodicexpense">
              Periodic expense
            </NavLink>
            <NavLink className="navLinkTable" to="/member/dailyexpense">
              Daily expense
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
