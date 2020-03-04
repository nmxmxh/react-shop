import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from '../src/pages/homepage/homepage.component';
import ShopPage from '../src/pages/shop/shop.component';
import SignInAndSignUpPage from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from '../src/pages/checkout/checkout.component';

import Header from '../src/components/header/header.component';

// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/users.selectors';
import { checkUserSession } from './redux/user/user.actions';


const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
    <Header />
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render ={() =>  currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
    </Switch>
    </div>
  );

}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
