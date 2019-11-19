import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../components/login";
import Dashboard from "../components/dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate={true} />

      {/* redirect user to Login page if route does not exist and user is not authenticated */}
      <Route component={Login} />
    </Switch>
  );
}
