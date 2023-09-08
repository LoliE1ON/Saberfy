import { RootState } from "store";

import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import { Badge, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from '@mui/icons-material/Search';

const bottomStyles = {
	paddingTop: "12px!important",
};

export function Navigation() {
	const spotifyTotalTracks = useSelector((state: RootState) => state.spotify.total);
	const beatSaberTotalMaps = useSelector((state: RootState) => state.beatSaber.localMaps).length;

	const [value, setValue] = React.useState(0);
	const navigate = useNavigate();

	return (
		<Paper elevation={0}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}>
				<BottomNavigationAction
					label="Spotify"
					sx={bottomStyles}
					onClick={() => navigate("/")}
					icon={
						<Badge badgeContent={spotifyTotalTracks} max={99999}>
							<QueueMusicIcon />
						</Badge>
					}
				/>
				<BottomNavigationAction
					onClick={() => navigate("/search")}
					sx={bottomStyles}
					label="BeatSaver"
					icon={<SearchIcon />}
				/>
				<BottomNavigationAction
					onClick={() => navigate("/local-maps")}
					sx={bottomStyles}
					label="Library"
					icon={
						<Badge badgeContent={beatSaberTotalMaps} max={99999}>
							<StorageIcon />
						</Badge>
					}
				/>
				<BottomNavigationAction
					onClick={() => navigate("/settings")}
					sx={bottomStyles}
					label="Settings"
					icon={<SettingsIcon />}
				/>
			</BottomNavigation>
		</Paper>
	);
}
