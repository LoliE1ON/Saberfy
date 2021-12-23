import React, { useEffect, useRef, useState } from "react";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";
import { Modal, Card, List } from "antd";
import { MapsComponent } from "./MapsComponent";
import { useIntersection } from "../Hooks/Intersection";

const { Meta } = Card;
const { ipcRenderer } = window.require("electron");

export function TracksComponent() {
    const [offset, setOffset] = useState(0);

    const ref = useRef(null);
    const isView = useIntersection(ref.current);

    useEffect(() => {
        isView && setOffset(offset => offset + 50);
    }, [isView]);

    const { dispatch, tracks } = useStoreon<StoreState, StoreEvents>("tracks");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTrackId, setSelectedTrackId] = useState("");

    const showModal = (trackId: string) => {
        setIsModalVisible(true);
        setSelectedTrackId(trackId);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        ipcRenderer.invoke("spotify/getLikedTracks", { limit: 50, offset }).then(result => {
            dispatch("spotify/setTracks", result);
        });
    }, [dispatch, offset]);

    return (
        <div>
            <List
                grid={{ column: 4 }}
                dataSource={tracks}
                renderItem={item => (
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        onClick={() => showModal(item.track.id)}
                        cover={<img alt="example" src={item.track.previewUrl} />}>
                        <Meta title={item.track.artists[0].name} description={item.track.name} />
                    </Card>
                )}
            />

            <Modal title="BeatSaver Maps" width={950} onCancel={handleCancel} footer={null} visible={isModalVisible}>
                <MapsComponent trackId={selectedTrackId} />
            </Modal>

            <div style={{ height: 20 }} ref={ref}></div>
        </div>
    );
}
