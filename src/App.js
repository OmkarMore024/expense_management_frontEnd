import NavBar from "./components/navbar";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadLogin } from "./components/actions/loginAction";
import jwt_decode from "jwt-decode";

function App() {
  let [userLogin1, setuserLogin] = useState("none");
  const token = useSelector((state) => state.loginReducer.token);
  console.log("in app.js");
  // const decoded = token ? jwt_decode(token) : null;
  // console.log(decoded);

  //for avoiding the refresh login
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(loadLogin());
    }
    // setuserLogin(decoded);
  }, []);

  return (
    <div className="App">
      {/* <h4>hi this in app</h4> */}
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
