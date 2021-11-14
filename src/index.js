import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import Brews from "./components/Brews";

import registerServiceWorker from "./registerServiceWorker";

import "gestalt/dist/gestalt.css";

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact component={App} path="/" />
        <Route component={Signin} path="/signin" />
        <Route component={Signup} path="/signup" />
        <Route component={Checkout} path="/checkout" />
        <Route component={Brews} path="/:id" />
      </Switch>
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
