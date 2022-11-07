import React, { useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { RiToolsFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { loadLogin, removeLogin } from "./actions/loginAction";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SideDashboard(props) {
  const { handleClick, firstName } = props;
  const token = useSelector((state) => state.loginReducer.token);
  const userInfo = useSelector((state) => state.loginReducer.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) dispatch(loadLogin());
  // }, []);
  let dashLink = "";
  if (userInfo.role === "Admin") {
    dashLink = "admin";
    // navigate("/admin");
  } else if (userInfo.role === "Primary User") {
    dashLink = "primary-user";
  } else if (userInfo.role === "Member") {
    dashLink = "member";
  }

  const handleLogout = () => {
    console.log("in handle logout side-dashboard");
    // console.log(token);

    dispatch(removeLogin());

    navigate("/");
    (() => {
      toast.info("Logout Succesfully !");
    })();
  };
  const handleDashboard = () => {
    console.log("in handleDashboard in side-dashboard");
    // navigate()
  };

  return (
    <div className="side-dashboard">
      <div className="logo">
        <img src="images/expenses_name.png" />
      </div>
      <div className="main-dashoard bg-color">
        {/* <div className="user-img"> */}
        {/* <div className="user-img"></div> */}
        <img src="images/avatar.png" className="user-img" />

        <div className="header-name">
          <h5>Hello {userInfo.userName}</h5>
          <span>Welcome Back</span>
        </div>
        <nav className="navDiv">
          <ul className="navTab">
            <NavLink to={`/${dashLink}`}>
              <li className="navColor">
                <RiDashboardFill className="sym" />
                Dashboard
              </li>
            </NavLink>

            <li className="navColor">
              <IoMdNotifications className="sym" />
              Notifications
            </li>
            <li className="navColor">
              <RiToolsFill className="sym" />
              Settings
            </li>
            <li className="navColor" onClick={handleLogout}>
              <IoIosLogOut className="sym" />
              Logout
            </li>
            <li className="navColor">
              <IoIosLogOut className="sym" />
              Dashboard
            </li>
          </ul>
          {/* <a className="navLink" href="#">
            Dashboard
          </a>
          <a className="navLink" href="#"></a>
          <a className="navLink" href="#"></a>
          <a className="navLink"></a> */}
        </nav>
      </div>
    </div>
  );
}
