import dayjs from "dayjs";
import { RootState } from "store";
import { ipc } from "utils";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IpcChannel } from "types/ipc";

import { setSpotifyIsLoadTracks, setSpotifyTracks } from "store/spotify/actions";

import { TrackModal } from "components/Tracks/TrackModal";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Avatar, Box, CircularProgress, ListItemAvatar, Paper } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useIntersection } from "hooks/useIntersection";

export function TrackList() {
	const spotify = useSelector((state: RootState) => state.spotify);
	const [offset, setOffset] = useState(0);
	const dispatch = useDispatch();
	const ref = useRef(null);
	const isView = useIntersection(ref.current);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		isView && setOffset(offset => offset + 50);
	}, [isView]);

	useEffect(() => {
		dispatch(setSpotifyIsLoadTracks(true));
		ipc.invoke(IpcChannel.spotifyGetTracks, { limit: 50, offset }).then(result => {
			dispatch(setSpotifyTracks(result));
			dispatch(setSpotifyIsLoadTracks(false));
		});
	}, [offset]);

	const [selectedIndex, setSelectedIndex] = React.useState(null);

	const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		setSelectedIndex(index);
		handleOpen();
	};

	return (
		<div>
			{spotify.tracks.length ? (
				<Paper elevation={1}>
					{spotify.tracks.map((item, key) => (
						<ListItemButton
							key={key}
							alignItems="center"
							selected={selectedIndex === key}
							onClick={event => handleListItemClick(event, key)}>
							<ListItemAvatar sx={{ p: 1 }}>
								<Avatar
									sx={{ width: 64, height: 64 }}
									alt={item.track.name}
									src={item.track.album.images[0].url}
								/>
							</ListItemAvatar>

							<ListItemText>
								{item.track.name}
								<Box component={"span"} sx={{ color: "text.disabled", fontSize: "smaller", ml: 1 }}>
									{item.track.album.artists.map((artist, key) => artist.name)}
								</Box>
								<Box sx={{ color: "text.disabled", fontSize: "smaller" }}>{item.track.album.name}</Box>
							</ListItemText>
							<ListItemText sx={{ color: "text.disabled", textAlign: "right" }}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "right",
										alignItems: "center",
									}}>
									<Box component={"span"} sx={{ color: "text.disabled", fontSize: "small", m: 2 }}>
										{Math.floor((item.track.duration_ms / 1000 / 60) << 0)}:
										{Math.floor((item.track.duration_ms / 1000) % 60)}
									</Box>
									<Box component={"span"} sx={{ color: "text.disabled", fontSize: "small", m: 1 }}>
										Added {dayjs(item.added_at).format("DD MMMM YYYY")}
									</Box>

									<Box component={"span"} sx={{ color: "success.main", pt: 0.5 }}>
										<PlayArrowIcon />
										<PauseIcon />
									</Box>
								</Box>
							</ListItemText>
						</ListItemButton>
					))}
				</Paper>
			) : (
				<React.Fragment />
			)}

			{selectedIndex !== null ? (
				<TrackModal handleClose={handleClose} track={spotify.tracks[selectedIndex]} open={open} />
			) : (
				<React.Fragment />
			)}

			{spotify.isLoadTracks ? (
				<Paper
					sx={{
						position: "fixed",
						bottom: 0,
						left: 0,
						right: 0,
						p: 1,
						zIndex: 9999,
						textAlign: "center",
					}}
					elevation={2}>
					<Box
						sx={{
							color: "text.disabled",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}>
						Loading Spotify tracks <CircularProgress sx={{ ml: 3 }} disableShrink />
					</Box>
				</Paper>
			) : (
				<React.Fragment />
			)}

			<div style={{ height: 20 }} ref={ref} />
		</div>
	);
}
