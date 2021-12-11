import React from "react";
import "antd/dist/antd.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import { StoreContext } from "storeon/react";
import { store } from "./store";
import "./App.css";

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
}
