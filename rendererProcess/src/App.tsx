import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import { StoreContext } from "storeon/react";
import { store } from "./store";
import "./App.css";
import { AuthComponent } from "./Spotify/AuthComponent";

const { ipcRenderer } = window.require("electron");

export default function App() {
    useEffect(() => {
        ipcRenderer.on("open-by-link", function (evt, { args }) {
            const urlParams = args.pop();
            const HUI = new URL(urlParams);
            alert(HUI.href);
        });
    }, []);

    return (
        <StoreContext.Provider value={store}>
            <Router>
                <Switch>
                    <Route path="/">
                        <Main />
                    </Route>
                    <Route path="/">
                        <AuthComponent />
                    </Route>
                </Switch>
            </Router>
        </StoreContext.Provider>
    );
}
