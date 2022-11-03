import NavBar from "./components/navbar";
import "./App.css";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadLogin } from "./components/actions/loginAction";
import jwt_decode from "jwt-decode";

function App() {
  let [userLogin1, setuserLogin] = useState("none");
  const token = useSelector((state) => state.loginReducer.token);
  // console.log("in app.js");
  const navigate = useNavigate();
  // const decoded = token ? jwt_decode(token) : null;
  // console.log(decoded);

  //for avoiding the refresh login
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(loadLogin());
    } else {
      navigate("/login");
    }
    // setuserLogin(decoded);
  }, []);

  return token ? (
    <div className="App">
      <Outlet />
    </div>
  ) : (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
