import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveryman from '../pages/Deliveryman';
import DeliverymanForm from '~/pages/Deliveryman/Form';

import Problem from '../pages/Problem';

import Delivery from '../pages/Delivery';
import DeliveryForm from '../pages/Delivery/Form';

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
        component={DeliverymanForm}
        isPrivate
      />
      <Route
        path="/deliveryman/update/:id"
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/problem" component={Problem} isPrivate />

      <Route path="/delivery" exact component={Delivery} isPrivate />
      <Route path="/delivery/create" exact component={DeliveryForm} isPrivate />
      <Route path="/delivery/update/:id" component={DeliveryForm} isPrivate />

      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route
        path="/recipient/create"
        exact
        component={AddRecipient}
        isPrivate
      />
      <Route
        path="/recipient/update/:id"
        component={UpdateRecipient}
        isPrivate
      />
    </Switch>
  );
}
