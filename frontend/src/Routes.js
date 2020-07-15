import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "scenes/Dashboard";
import RoomHost from "scenes/RoomHost";
import RoomClient from "scenes/RoomClient";

const Routes = () => {
  return (
    <Switch>
      <Route path="/room/:roomCode" component={RoomClient} />
      <Route path="/host/:roomCode" component={RoomHost} />
      <Route exact path="/" component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
