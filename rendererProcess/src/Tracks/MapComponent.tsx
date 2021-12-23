import React, { useState } from "react";
import { StoreEvents, StoreState, TrackMap } from "../../../types";
import { List, Space, Rate, Button, Modal } from "antd";
import { LikeOutlined, DislikeOutlined, PlusOutlined, CloseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useStoreon } from "storeon/react";
import { MapsComponent } from "./MapsComponent";
import { BSViewerComponent } from "../BSViewer/BSViewerComponent";

type TrackComponentProps = {
    map: TrackMap;
};

const { ipcRenderer } = window.require("electron");

const IconText = ({ icon, text }: { icon: any; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export function MapComponent(props: TrackComponentProps) {
    const { beatSaber, dispatch } = useStoreon<StoreState, StoreEvents>("beatSaber");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const downloadMap = (url: string, folderName: string) => {
        ipcRenderer.invoke("beatSaber/downloadMap", { url, folderName }).then((isSuccess: boolean) => {
            if (isSuccess) {
                dispatch("beatSaber/addLocalMap", folderName);
            }

            //TODO: alert error
        });
    };

    const deleteMap = (folderName: string) => {
        ipcRenderer.invoke("beatSaber/deleteMap", folderName).then((result: boolean) => {
            if (result) {
                dispatch("beatSaber/deleteMap", folderName);
            }

            //TODO: alert error
        });
    };

    const AddButton = ({ localMaps, map }: { localMaps: string[]; map: TrackMap }) => {
        const mapName = `${map.metadata.songName} - ${map.metadata.levelAuthorName}`;
        const mapFullName = `${map.id} (${map.metadata.songName} - ${map.metadata.levelAuthorName})`;

        const regExp = new RegExp(`\\((${mapName})\\)`);

        const localMap = localMaps.find(map => regExp.exec(map));

        if (localMap) {
            return (
                <Button type="primary" onClick={() => deleteMap(localMap)} danger>
                    <CloseOutlined /> Remove from BeatSaber
                </Button>
            );
        } else {
            return (
                <Button onClick={() => downloadMap(map.versions[0].downloadURL, mapFullName)}>
                    <PlusOutlined /> Add to BeatSaber
                </Button>
            );
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <List.Item
            key={props.map.name}
            actions={[
                <Rate disabled defaultValue={props.map.stats.score * 5} />,
                <IconText icon={LikeOutlined} text={props.map.stats.upvotes.toString()} key="list-vertical-like-o" />,
                <IconText icon={DislikeOutlined} text={props.map.stats.downvotes.toString()} key="list-vertical-like-o" />,
                <Button onClick={showModal}>
                    <PlayCircleOutlined /> Preview
                </Button>,
                <AddButton localMaps={beatSaber.localMaps} map={props.map} />,
            ]}
            extra={<img width={150} alt="logo" src={props.map.versions[0].coverURL} />}>
            <List.Item.Meta title={<div>{props.map.name}</div>} description={props.map.description} />

            <Modal title="BSViewer" destroyOnClose={true} width={950} onCancel={handleCancel} footer={null} visible={isModalVisible}>
                <BSViewerComponent id={props.map.id} />
            </Modal>
        </List.Item>
    );
}
