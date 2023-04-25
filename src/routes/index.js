import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/DashboardContainer';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
);

export default Routes;
