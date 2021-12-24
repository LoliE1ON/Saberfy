import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { useHistory } from "react-router-dom";

const { ipcRenderer } = window.require("electron");

export function AuthComponent() {
    const history = useHistory();
    const { isAuthorize, dispatch } = useStoreon<StoreState, StoreEvents>("isAuthorize");

    const auth = () => {
        ipcRenderer.invoke("spotify/openAuthLink");
    };

    useEffect(() => {
        ipcRenderer.on("spotify-auth", function (evt, isAuthorize: boolean) {
            if (isAuthorize) {
                dispatch("setAuthorize", isAuthorize);
            }
        });
    }, []);

    useEffect(() => {
        if (isAuthorize) {
            history.push("/app");
        }
    }, [isAuthorize]);

    return (
        <Row style={{ height: "100vh" }} justify="center" align="middle">
            <Col style={{ textAlign: "center" }}>
                <p>Login to Spotify to continue!</p>
                <Button type="primary" shape="round" onClick={auth} size="large">
                    Login
                </Button>
            </Col>
        </Row>
    );
}
