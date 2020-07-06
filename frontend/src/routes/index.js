import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Deliveryman from '../pages/Deliveryman';
import Problem from '../pages/Problem';
import Delivery from '../pages/Delivery';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveryman" component={Deliveryman} />
      <Route path="/problem" component={Problem} />
      <Route path="/delivery" component={Delivery} />
    </Switch>
  );
}
