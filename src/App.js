import React, { useEffect, lazy, Suspense  } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

// import ShopPage from '../src/pages/shop/shop.component';
// import SignInAndSignUpPage from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CheckoutPage from '../src/pages/checkout/checkout.component';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component.jsx';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/users.selectors';
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('../src/pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('../src/pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('../src/pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
    <Header />
    <Switch>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render ={() =>  currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
      </Suspense>
    </ErrorBoundary>
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
