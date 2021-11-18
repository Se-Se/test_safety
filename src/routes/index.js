import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Resource from "../pages/management/index";

export default function routes() {
  return (
    <Router>
      <Switch>
        <Route path="/resource" component={Resource} />
      </Switch>
    </Router>
  );
}
