import { RootState } from "store";

import React from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

export function LocalMaps() {
	const maps = useSelector((state: RootState) => state.beatSaber.localMaps);
	return (
		<Box>
			{maps.map(map => (
				<Box>{map}</Box>
			))}
		</Box>
	);
}
