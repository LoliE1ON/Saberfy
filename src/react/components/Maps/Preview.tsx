import React from "react";

type PreviewProps = {
	id: string;
};

export function Preview({ id }: PreviewProps) {
	return (
		<iframe
			style={{ width: "100%", height: "500px", border: "none" }}
			title={id}
			src={`https://skystudioapps.com/bs-viewer/?id=${id}`}
		/>
	);
}
