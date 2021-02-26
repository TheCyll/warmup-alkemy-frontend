import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home';

const AppRouter = () => (  
  
  <BrowserRouter>
    <div className="main-container">
      <Header />      
      <Switch>
        <Route component={Home} path="/" exact={true} />
      </Switch>           
    </div>
  </BrowserRouter>
);

export default AppRouter;