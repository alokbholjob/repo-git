import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React,{Component} from 'react';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import DetailScreen from './DetailScreen';

function App() {
  return (
   <>
      <Router>
        <Switch>
          <Route exact path='/' component={HomeScreen}></Route>
          <Route  path='/AboutScreen' component={AboutScreen}></Route>
          <Route path='/ContactScreen' component={ContactScreen}></Route>
          <Route path='/DetailScreen' component={DetailScreen}></Route>
        </Switch>
      </Router>
   </>
  );
}

export default App;
