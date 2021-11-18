import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Resource from "../pages/management/index";
import Safety from "../pages/safety/index";

export default function routes() {
  return (
    <Router>
      <Switch>
        <Route path="/resource" component={Resource} />
        <Route path="/safety" component={Safety} />
      </Switch>
    </Router>
  );
}
