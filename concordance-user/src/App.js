import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from "./Screens/Search";
import Header from "./Layouts/Header";
import Help from "./Screens/Help";
import Aboutus from "./Screens/Aboutus";
import Statistics from "./Screens/Statistics";
import Home from "./Screens/Home";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/statistics" component={Statistics} />
          <Route path="/aboutus" component={Aboutus} />
          <Route path="/help" component={Help} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}
