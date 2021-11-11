  
import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './pages/Services';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Account from './pages/Account'
import MyTrusts from './pages/MyTrusts';
import MyTransactions from './pages/MyTransactions';
import ServiceRequests from './pages/ServiceRequests';
import MyAccounts from './pages/MyAccounts';
import LoginError from './pages/LoginError';
import MyAccountsError from './pages/MyAccountsError';
import MyTransactionsError from './pages/MyTransactionsError';
import MyTrustsError from './pages/MyTrustsError';

/* Main App component where everything is routed */

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/account' component={Account} />
          <Route path='/my-trusts' component={MyTrusts} />
          <Route path='/my-transactions' component={MyTransactions} />
          <Route path='/service-request' component={ServiceRequests} />
          <Route path='/my-accounts' component={MyAccounts} />
          <Route path='/login-error' component={LoginError} />
          <Route path='/accounts-error' component={MyAccountsError} />
          <Route path='/trusts-error' component={MyTrustsError} />
          <Route path='/transactions-error' component={MyTransactionsError} />
        </Switch>
      </Router>
    </>
  );
}

export default App;