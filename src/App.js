import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Booking from './components/Booking';
import Subscribe from './components/Subscription';

// Static Assets
import './App.css';
import './assets/fonts/Poppins-Bold.ttf';
import './assets/fonts/Poppins-Regular.ttf';
import './assets/fonts/Poppins-SemiBold.ttf';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/book" component={Booking} />
            <Route path="/subscribe" component={Subscribe} />
            <Route path="/" exact component={Home} />
            <Route render={() => <h2>Not Found</h2>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
