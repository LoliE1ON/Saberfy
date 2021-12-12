import React, { useState } from "react";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { List } from "antd";
import { Card } from "antd";
import { Modal } from "antd";
import { MapsComponent } from "./MapsComponent";

const { Meta } = Card;
export function TracksComponent() {
    const { tracks } = useStoreon<StoreState, StoreEvents>("tracks");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState("");

    const showModal = (track: string) => {
        setIsModalVisible(true);
        setSelectedTrack(track);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <List
                grid={{ column: 4 }}
                dataSource={tracks}
                renderItem={item => (
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        onClick={() => showModal(`${item.track.artists[0].name} - ${item.track.name}`)}
                        cover={<img alt="example" src={item.track.previewUrl} />}>
                        <Meta title={item.track.artists[0].name} description={item.track.name} />
                    </Card>
                )}
            />

            <Modal title="BeatSaver Maps" onCancel={handleCancel} footer={null} visible={isModalVisible}>
                <MapsComponent track={selectedTrack} />
            </Modal>
        </div>
    );
}
