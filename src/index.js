import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Home from "./components/pages/home";
import { Provider } from "react-redux";

import store from "./store";
import PrimaryUser from "./components/PrimaryUser";
import Member from "./components/Members";
import Admin from "./components/admin";
import ExpenseType from "./components/databaseComp/expenseType";
import Users from "./components/databaseComp/users";
import ErrorPage from "./components/pages/errorPage";
import EditExpenseType, {
  expenseLoader,
} from "./components/databaseComp/editExpenseType";
import PeriodicExpense from "./components/databaseComp/periodicexpense";
import DailyExpense from "./components/databaseComp/dailyexpense";
import Protected from "./components/common/protectedRoute";
import HouseHold from "./components/databaseComp/householdType";
import Members from "./components/databaseComp/memberType";
import EditHouseHold, {
  houseHoldLoader,
} from "./components/databaseComp/editHouseHold";
import EditMember from "./components/databaseComp/editMember";
import EditUser, { userLoader } from "./components/databaseComp/editUser";
import EditPeriodicPayment from "./components/databaseComp/editPeriodicPayment";
import UpdatePeriodicPayment, {
  periodicPaymentLoader,
} from "./components/databaseComp/updatePeriodicPayment";
import EditDailyExpenses from "./components/databaseComp/addDailyExpenses";
import ResetPassword from "./components/pages/resetPassword";
import ForgetPassword from "./components/pages/forgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      // { path: "login/checkHome", element: <Home /> },
      { path: "forgetpassword", element: <ForgetPassword /> },

      // {
      //   path: "changepassword/:userId",
      //   element: <ResetPassword />,
      //   loader: userLoader,
      // }
      {
        path: "admin",
        element: <Protected compo={<Admin />}></Protected>,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <ExpenseType /> },
          { path: "expensetype", element: <ExpenseType /> },
          { path: "expensetype/addExpenseType", element: <EditExpenseType /> },
          {
            path: "expensetype/:expenseId",
            element: <EditExpenseType />,
            loader: expenseLoader,
          },
          { path: "users", element: <Users /> },
          { path: "users/:userId", element: <EditUser />, loader: userLoader },
        ],
      },
      {
        path: "primary-user",
        element: <Protected compo={<PrimaryUser />}></Protected>,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HouseHold /> },
          { path: "periodicexpense", element: <PeriodicExpense /> },
          {
            path: "periodicexpense/addperiodicexpenses",
            element: <EditPeriodicPayment />,
          },
          {
            path: "periodicexpense/:periodicPaymentId",
            element: <UpdatePeriodicPayment />,
            loader: periodicPaymentLoader,
          },
          { path: "dailyexpense", element: <DailyExpense /> },
          {
            path: "dailyexpense/adddailyexpense",
            element: <EditDailyExpenses />,
          },
          { path: "members", element: <Members /> },
          { path: "members/addmember", element: <EditMember /> },
          { path: "households", element: <HouseHold /> },
          { path: "households/addhousehold", element: <EditHouseHold /> },
          {
            path: "households/:houseHoldId",
            element: <EditHouseHold />,
            loader: houseHoldLoader,
          },
        ],
      },
      {
        path: "member",
        element: <Protected compo={<Member />}></Protected>,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <PeriodicExpense /> },
          { path: "periodicexpense", element: <PeriodicExpense /> },
          {
            path: "periodicexpense/:periodicPaymentId",
            element: <UpdatePeriodicPayment />,
            loader: periodicPaymentLoader,
          },
          { path: "dailyexpense", element: <DailyExpense /> },
          {
            path: "dailyexpense/adddailyexpense",
            element: <EditDailyExpenses />,
          },
        ],
      },
    ],
  },
  {
    path: "changepassword/:userId",
    element: <ResetPassword />,
    loader: userLoader,
  },
  ,
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
