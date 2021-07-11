import React from 'react';
import BookingForm from './BookingForm';
import Admin from './Admin';
import Login from './Login';
import EditBooking from './EditBooking';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Main = () => (
  <Switch>
    <div>
      <Route exact path='/' component={BookingForm}></Route>
      <PrivateRoute exact path='/admin' component={Admin}></PrivateRoute>
      <PrivateRoute path='/booking/:id' component={EditBooking}></PrivateRoute>
      <Route exact path='/login' component={Login}></Route>
      <NotificationContainer />
    </div>
  </Switch>
);

export default Main;