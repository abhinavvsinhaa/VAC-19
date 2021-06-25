import React from 'react';
import Navbar from './components/navbar';
import Available from './components/available';
import Register from './components/register';
import Profile from './components/profile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {

  render() { 
    return(
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path = '/' component = {Available}/>
          <Route path = '/register' component = {Register}/>
          <Route path = '/profile' component = {Profile}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
