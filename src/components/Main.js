import React from 'react';
import BookingForm from './BookingForm';
import Admin from './Admin';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';


const Main = () => (
    <Switch>
      <Route exact path='/' component={BookingForm}></Route>
      <Route exact path='/admin' component={Admin}></Route>
      <Route exact path='/login' component={Login}></Route>
    </Switch>
);

export default Main;