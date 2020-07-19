import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveryman from '../pages/Deliveryman';
import AddDeliveryman from '~/pages/Deliveryman/AddDeliveryman';
import UpdateDeliveryman from '~/pages/Deliveryman/UpdateDeliveryman';

import Problem from '../pages/Problem';

import Delivery from '../pages/Delivery';
import AddDelivery from '../pages/Delivery/AddDelivery';
import UpdateDelivery from '../pages/Delivery/UpdateDelivery';

import Recipient from '../pages/Recipient';
import AddRecipient from '~/pages/Recipient/AddRecipient';
import UpdateRecipient from '~/pages/Recipient/UpdateRecipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/create"
        exact
        component={AddDeliveryman}
        isPrivate
      />
      <Route
        path="/deliveryman/update"
        component={UpdateDeliveryman}
        isPrivate
      />

      <Route path="/problem" component={Problem} isPrivate />

      <Route path="/delivery" exact component={Delivery} isPrivate />
      <Route path="/delivery/create" exact component={AddDelivery} isPrivate />
      <Route path="/delivery/update" component={UpdateDelivery} isPrivate />

      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route
        path="/recipient/create"
        exact
        component={AddRecipient}
        isPrivate
      />
      <Route path="/recipient/update" component={UpdateRecipient} isPrivate />
    </Switch>
  );
}
