import * as React from "react";

import { Doc } from "types/beatSaver";

import { Map } from "components/Maps/Map";

import { Divider, Paper } from "@mui/material";

export type MapListProps = {
	maps: Doc[];
};

export function MapList({ maps }: MapListProps) {
	return (
		<div>
			<div style={{ width: "100%" }}>
				{maps.length ? (
					maps.map((item, key) => <Map map={item} key={key} />)
				) : (
					<div>
						<Paper sx={{ p: 2 }} elevation={0}>
							Maps not found
						</Paper>
					</div>
				)}
			</div>
		</div>
	);
}
