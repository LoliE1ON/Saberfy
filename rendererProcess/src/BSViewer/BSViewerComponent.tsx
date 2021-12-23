import React from "react";

type BSViewerComponentProps = {
    id: string;
};

export function BSViewerComponent({ id }: BSViewerComponentProps) {
    return (
        <iframe
            style={{ width: "100%", height: "500px", border: "none" }}
            title={id}
            src={`https://skystudioapps.com/bs-viewer/?id=${id}`}
        />
    );
}
