import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./component/Pages/HomePage";
import LoginPage from "./component/Pages/LoginPage";
import ForgetPassPage from "./component/Pages/ForgetPassPage";
import ResetPassPage from "./component/Pages/ResetPassPage";
import SignUpPage from "./component/Pages/SignUpPage";
import ConfirmationPage from "./component/Pages/ConfirmationPage";
import DashboardPage from "./component/Pages/DashboardPage";
import UserRoute from "./component/Route/UserRoute";
import GuestRoute from "./component/Route/GuestRoute";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <div className="ui container">
      <Route path="/" exact component={HomePage} />
      <Route path="/confirmation/:token" exact component={ConfirmationPage} />
      <Route path="/reset_password/:token" exact component={ResetPassPage} />

      {/* <Route path="/login" exact component={LoginPage} /> */}
      {/* just GuestRoute should see login page  */}
      <GuestRoute path="/login" exact component={LoginPage} />
      <GuestRoute path="/forgetpass" exact component={ForgetPassPage} />
      <GuestRoute path="/signup" exact component={SignUpPage} />
      {/* <Route path="/dashboard" exact component={DashboardPage} /> */}
      <UserRoute path="/dashboard" exact component={DashboardPage} />
    </div>
  );
};

export default App;
