import React from "react";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { List } from "antd";

export function LocalMapsComponent() {
    const { beatSaber } = useStoreon<StoreState, StoreEvents>("beatSaber");

    return <List bordered dataSource={beatSaber.localMaps} renderItem={item => <List.Item>{item}</List.Item>} />;
}
