import NavBar from "./components/navbar";
import "./App.css";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadLogin } from "./components/actions/loginAction";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  let [userLogin1, setuserLogin] = useState("none");
  const token = useSelector((state) => state.loginReducer.token);
  // console.log("in app.js");
  const navigate = useNavigate();
  

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

  return (
    <div className="App">
      {token ? (
        <Outlet />
      ) : (
        <div>
          <NavBar />
          <Outlet />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
