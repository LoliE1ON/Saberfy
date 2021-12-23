import React from "react";
import { Layout, Tabs } from "antd";
import { TracksComponent } from "../Tracks/TracksComponents";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { Badge } from "antd";
import { SettingsComponent } from "../Settings/SettingsComponent";
import { LocalMapsComponent } from "../BeatSaber/LocalMapsComponent";

const { TabPane } = Tabs;
const { Content } = Layout;

export default function Main() {
    const { total } = useStoreon<StoreState, StoreEvents>("total");
    const { beatSaber } = useStoreon<StoreState, StoreEvents>("beatSaber");

    return (
        <Content style={{ padding: "0 30px" }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Spotify Tracks" key="1">
                    <TracksComponent />
                </TabPane>
                <TabPane tab={<Badge style={{ backgroundColor: "#108ee9" }} count={total + " tracks"} />} key="2" disabled>
                    {" "}
                </TabPane>
                <TabPane tab="Local Maps" key="3">
                    <LocalMapsComponent />
                </TabPane>
                <TabPane
                    tab={<Badge style={{ backgroundColor: "#108ee9" }} count={beatSaber.localMaps.length + " maps"} />}
                    key="4"
                    disabled>
                    {" "}
                </TabPane>
                <TabPane tab="Settings" key="5">
                    <SettingsComponent />
                </TabPane>
            </Tabs>
        </Content>
    );
}
