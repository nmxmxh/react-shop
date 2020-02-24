import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import HomePage from '../src/pages/homepage/homepage.component';
import ShopPage from '../src/pages/shop/shop.component';
import SignInAndSignUpPage from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from '../src/components/header/header.component'


function App() {
  return (
    <div>
    <Header />
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
    </Switch>
    </div>
  );
}

export default App;
