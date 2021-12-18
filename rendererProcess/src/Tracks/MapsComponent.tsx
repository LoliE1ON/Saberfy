import React, { useEffect } from "react";
const { ipcRenderer } = window.require("electron");

export function MapsComponent(props: { track: string }) {
    useEffect(() => {
        findMaps(props.track);
    }, [props.track]);

    const findMaps = (track: string) => {
        ipcRenderer.invoke("beatSaver/findMaps", { query: track }).then(result => {
            console.log(result);
        });
    };

    return <div>{props.track}</div>;
}
