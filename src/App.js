import React from "react";
import "./App.css";
import Home from "./pages/Home";
import FormEdit from "./components/FormEdit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/update/:stuffId">
          <FormEdit />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
