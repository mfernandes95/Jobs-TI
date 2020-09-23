import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from '../pages/SignIn'
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
    </Switch>
  );
}
