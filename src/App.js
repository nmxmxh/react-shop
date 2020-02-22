import React from 'react';
import { Route } from 'react-router-dom'

import './App.css';

import HomePage from '../src/pages/homepage/homepage.component'
import ShopPage from '../src/pages/shop/shop.component'


function App() {
  return (
    <div>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
    </div>
  );
}

export default App;