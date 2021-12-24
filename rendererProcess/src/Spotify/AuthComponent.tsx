import React from "react";
import { Row, Col, Button } from "antd";

const { ipcRenderer } = window.require("electron");

export function AuthComponent() {
    const auth = () => {
        ipcRenderer.invoke("spotify/openAuthLink");
    };

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
