import { RootState } from "store";
import { ipc } from "utils";

import * as React from "react";
import { SyntheticEvent, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IpcChannel } from "types/ipc";
import { Item } from "types/spotify/track";

import {setBeatSaverMaps, updateBeatSaverMaps} from "store/beatSaver/actions";

import { MapList } from "components/Maps/MapList";
import { TrackSortBy } from "components/Tracks/TrackSortBy";
import { TrackTab } from "components/Tracks/TrackTab";

import { TabContext, TabList } from "@mui/lab";
import {
	Box,
	Chip,
	Dialog,
	FormControl,
	Grid,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Tab,
	Typography,
} from "@mui/material";
import {useIntersection} from "hooks/useIntersection";

export type TrackModalProps = {
	handleClose: () => void;
	track: Item;
	open: boolean;
};

export function TrackModal({ handleClose, track, open }: TrackModalProps) {
	const maps = useSelector((state: RootState) => state.beatSaver.maps);
	const [tab, setTab] = useState(TrackTab.songs);
	const [sort, setSort] = useState(TrackSortBy.relevance);

	const [offset, setOffset] = useState(0);
	const ref = useRef(null);
	const isView = useIntersection(ref.current);
	useEffect(() => {
		isView && setOffset(offset => offset + 1);
	}, [isView]);

	const dispatch = useDispatch();

	useEffect(() => {
		if (track) {
			setOffset(0);
			const artist = track.track.album.artists[0].name;
			const query = tab === TrackTab.songs ? `${track.track.name} - ${artist}` : artist;

			ipc.invoke(IpcChannel.beatSaverFindMaps, { query, page: offset, order: sort}).then(({ docs }) => {
				dispatch(setBeatSaverMaps(docs));
			});
		}
	}, [track, tab, sort]);

	useEffect(() => {
		if (track) {
			const artist = track.track.album.artists[0].name;
			const query = tab === TrackTab.songs ? `${track.track.name} - ${artist}` : artist;

			ipc.invoke(IpcChannel.beatSaverFindMaps, { query, page: offset, order: sort}).then(({ docs }) => {
				dispatch(updateBeatSaverMaps(docs));
			});
		}
	}, [offset]);

	const handleChangeTab = (event: SyntheticEvent, tab: TrackTab) => {
		setTab(tab);
	};

	const handleChangeSorting = (event: SelectChangeEvent) => {
		setSort(event.target.value as TrackSortBy);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll={"body"}
			fullWidth={true}
			maxWidth={"md"}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{ mt: 11 }}>
			{track && (
				<Box>
					<Paper sx={{ p: 2, pb: 0, borderRadius: 0 }} elevation={0}>
						<Grid container sx={{ color: "text.primary" }}>
							<Grid item xs={8}>
								<Typography variant="h5" component="div">
									{track.track.name}
									<Box component={"span"} sx={{ color: "text.disabled", fontSize: "smaller", ml: 1 }}>
										{track.track.album.artists.map(artist => artist.name)}
									</Box>
								</Typography>
							</Grid>
							<Grid item xs={4} sx={{ textAlign: "right" }}>
								<Chip size="small" label={`${maps.length} songs`} color="success" variant="outlined" />
							</Grid>
						</Grid>
					</Paper>

					<Paper sx={{ borderRadius: 0, pr: 2 }} elevation={0}>
						<Grid container sx={{ color: "text.primary" }}>
							<Grid item xs={8}>
								<TabContext value={tab}>
									<Box>
										<TabList onChange={handleChangeTab}>
											<Tab label="Songs" value={TrackTab.songs} />
											<Tab label="Find by Artist" value={TrackTab.artistSongs} />
										</TabList>
									</Box>
								</TabContext>
							</Grid>
							<Grid item xs={4} sx={{ textAlign: "right", color: "text.disabled" }}>
								<Typography variant="subtitle2" sx={{ pr: 1, lineHeight: 1 }} component="div">
									Sorting
								</Typography>
								<FormControl variant="standard" sx={{ minWidth: 80 }}>
									<Select
										labelId="sort-select-filled-label"
										id="sort-select-filled-label"
										value={sort}
										onChange={handleChangeSorting}>
										<MenuItem value={TrackSortBy.latest}>Latest</MenuItem>
										<MenuItem value={TrackSortBy.relevance}>Relevance</MenuItem>
										<MenuItem value={TrackSortBy.rating}>Rating</MenuItem>
										<MenuItem value={TrackSortBy.curated}>Curated</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Paper>
					<MapList maps={maps} />
				</Box>
			)}

			<div style={{ height: 20, background: "transparent" }} ref={ref} />
		</Dialog>
	);
}
