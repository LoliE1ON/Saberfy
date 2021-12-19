import React from "react";
import { Layout, Tabs } from "antd";
import { TracksComponent } from "../Tracks/TracksComponents";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { Badge } from "antd";
import { SettingsComponent } from "../Settings/SettingsComponent";

const { TabPane } = Tabs;
const { Content } = Layout;

export default function Main() {
    const { total } = useStoreon<StoreState, StoreEvents>("total");

    return (
        <Content style={{ padding: "0 30px" }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tracks" key="1">
                    <TracksComponent />
                </TabPane>
                <TabPane tab="Settings" key="2">
                    <SettingsComponent />
                </TabPane>
                <TabPane tab={<Badge style={{ backgroundColor: "#108ee9" }} count={total + " tracks"} />} disabled>
                    {" "}
                </TabPane>
            </Tabs>
        </Content>
    );
}
