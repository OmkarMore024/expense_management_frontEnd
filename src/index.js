import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import { Provider } from "react-redux";

import store from "./store";
import PrimaryUser from "./components/PrimaryUser";
import Member from "./components/Members";
import Admin from "./components/admin";
import ExpenseType from "./components/databaseComp/expenseType";
import Users from "./components/databaseComp/users";
import ErrorPage from "./components/errorPage";
import EditExpenseType from "./components/databaseComp/editExpenseType";
import PeriodicExpense from "./components/databaseComp/periodicexpense";
import DailyExpense from "./components/databaseComp/dailyexpense";
import Protected from "./components/common/protectedRoute";
import HouseHold from "./components/databaseComp/householdType";
import Members from "./components/databaseComp/memberType";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <div>in home element</div> },
      { path: "home", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "admin",
        element: <Protected compo={<Admin />}></Protected>,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <ExpenseType /> },
          { path: "expensetype", element: <ExpenseType /> },
          { path: "expensetype/addExpenseType", element: <EditExpenseType /> },
          { path: "users", element: <Users /> },
        ],
      },
      {
        path: "primary-user",
        element: <Protected compo={<PrimaryUser />}></Protected>,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <PeriodicExpense /> },
          { path: "periodicexpense", element: <PeriodicExpense /> },
          { path: "dailyexpense", element: <DailyExpense /> },
          { path: "members", element: <Members /> },
          { path: "households", element: <HouseHold /> },
        ],
      },
      {
        path: "member",
        element: <Protected compo={<Member />}></Protected>,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <PeriodicExpense /> },
          { path: "periodicexpense", element: <PeriodicExpense /> },
          { path: "dailyexpense", element: <DailyExpense /> },
        ],
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
