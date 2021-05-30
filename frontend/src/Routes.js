import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from 'src/scenes/Dashboard';
import RoomHost from 'src/scenes/RoomHost';
import RoomClient from 'src/scenes/RoomClient';

const Routes = () => {
  return (
    <Switch>
      <Route path='/room/:roomCode' component={RoomClient} />
      <Route path='/host/:roomCode' component={RoomHost} />
      <Route exact path='/' component={Dashboard} />
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;
