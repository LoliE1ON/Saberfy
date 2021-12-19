import React from "react";
import { useStoreon } from "storeon/react";
import { StoreEvents, StoreState } from "../../../types";

export function SettingsComponent() {
    const { beatSaber } = useStoreon<StoreState, StoreEvents>("beatSaber");

    return <div>BeatSaber path: {beatSaber.path}</div>;
}
