import React from "react";
import { Layout, Tabs } from "antd";

const { TabPane } = Tabs;
const { Content } = Layout;

export default function Main() {
  return (
    <Content style={{ padding: "0 30px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          2
        </TabPane>
      </Tabs>

    </Content>
  );
}
