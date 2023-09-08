import { RootState } from "store";

import React from "react";
import { useSelector } from "react-redux";

import {Avatar, ListItemAvatar, Paper} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export function LocalMaps() {
	const maps = useSelector((state: RootState) => state.beatSaber.localMaps);
	return (
		<Paper elevation={1}>
			{maps.map((map, key) => (
				<ListItemButton
					key={key}
					alignItems="center">
					<ListItemAvatar sx={{ p: 1 }}>
						<Avatar
							sx={{ width: 64, height: 64 }}
							alt={map}
						/>
					</ListItemAvatar>

					<ListItemText>
						{map}
					</ListItemText>
				</ListItemButton>
			))}
		</Paper>
	);
}
