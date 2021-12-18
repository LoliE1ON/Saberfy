import React from "react";
import { TrackMap } from "../../../types";
import { List, Space, Rate, Button } from "antd";
import { LikeOutlined, DislikeOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";

type TrackComponentProps = {
    map: TrackMap;
};

const IconText = ({ icon, text }: { icon: any; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export function MapComponent(props: TrackComponentProps) {
    console.log(props.map);

    return (
        <List.Item
            key={props.map.name}
            actions={[
                <Rate disabled defaultValue={props.map.stats.score * 5} />,
                <IconText icon={LikeOutlined} text={props.map.stats.upvotes.toString()} key="list-vertical-like-o" />,
                <IconText icon={DislikeOutlined} text={props.map.stats.downvotes.toString()} key="list-vertical-like-o" />,
                <Button>
                    <PlusOutlined /> Add to BeatSaber
                </Button>,
                <Button type="primary" danger>
                    <CloseOutlined /> Remove from BeatSaber
                </Button>,
            ]}
            extra={<img width={150} alt="logo" src={props.map.versions[0].coverURL} />}>
            <List.Item.Meta title={<div>{props.map.name}</div>} description={props.map.description} />
        </List.Item>
    );
}
