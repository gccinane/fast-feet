import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveryman from '../pages/Deliveryman';
import Problem from '../pages/Problem';
import Delivery from '../pages/Delivery';
import AddDelivery from '../pages/Delivery/AddDelivery';
import Recipient from '../pages/Recipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />
      <Route path="/delivery" exact component={Delivery} isPrivate />
      <Route path="/delivery/create" exact component={AddDelivery} isPrivate />
      <Route path="/recipient" exact component={Recipient} isPrivate />
    </Switch>
  );
}
