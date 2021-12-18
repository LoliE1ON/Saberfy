import React, { useEffect, useMemo } from "react";
import { Badge, List } from "antd";
import { StoreEvents, StoreState, Track } from "../../../types";
import { useStoreon } from "storeon/react";
import { MapComponent } from "./MapComponent";
import { CaretRightOutlined } from "@ant-design/icons";

const { ipcRenderer } = window.require("electron");

type MapsComponentProps = {
    trackId: string;
};

export function MapsComponent(props: MapsComponentProps) {
    const { dispatch, tracks } = useStoreon<StoreState, StoreEvents>("tracks");

    const track: Track = useMemo(() => {
        return tracks.filter(track => track.track.id === props.trackId)[0];
    }, [tracks, props.trackId]);

    useEffect(() => {
        if (track.maps.length === 0) {
            ipcRenderer.invoke("beatSaver/findMaps", { query: `${track.track.artists[0].name} - ${track.track.name}` }).then(result => {
                dispatch("track/setMaps", { trackId: track.track.id, maps: result });
            });
        }
    }, [props.trackId]);

    return (
        <div>
            <h3>
                <CaretRightOutlined /> {track.track.artists[0].name} - {track.track.name}
            </h3>

            <List
                itemLayout="vertical"
                size="large"
                header={
                    <div>
                        Found <Badge size={"default"} style={{ backgroundColor: "#108ee9" }} count={track.maps.length} /> maps
                    </div>
                }
                bordered
                dataSource={track.maps}
                renderItem={map => <MapComponent map={map} />}
            />
        </div>
    );
}
