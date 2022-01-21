import { RootState } from "store";

import * as React from "react";
import { useSelector } from "react-redux";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import { Badge, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export function Navigation() {
	const spotifyTotalTracks = useSelector((state: RootState) => state.spotify.total);
	const [value, setValue] = React.useState(0);

	return (
		<Paper sx={{ position: "fixed", top: 0, left: 0, right: 0, p: 1, zIndex: 9999 }} elevation={0}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}>
				<BottomNavigationAction
					label="Spotify tracks"
					icon={
						<Badge badgeContent={spotifyTotalTracks} max={99999}>
							<QueueMusicIcon />
						</Badge>
					}
				/>
				<BottomNavigationAction label="Local maps" icon={<StorageIcon />} />
				<BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
			</BottomNavigation>
		</Paper>
	);
}
