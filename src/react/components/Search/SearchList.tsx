import { RootState } from "store";
import { ipc } from "utils";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IpcChannel } from "types/ipc";

import {setBeatSaverMaps, updateBeatSaverMaps} from "store/beatSaver/actions";

import { MapList } from "components/Maps/MapList";
import { TrackSortBy } from "components/Tracks/TrackSortBy";
import {
	Box,
	Chip,
	FormControl,
	Grid,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import {useIntersection} from "hooks/useIntersection";
import {FindMapsOrder} from "types/beatSaver/findMapsParameters";

export type SearchListProps = {
	query: string;
};

export function SearchList({ query }: SearchListProps) {
	const maps = useSelector((state: RootState) => state.beatSaver.maps);
	const [sort, setSort] = useState(TrackSortBy.relevance);

	const [offset, setOffset] = useState(0);

	const ref = useRef(null);
	const isView = useIntersection(ref.current);
	useEffect(() => {
		isView && setOffset(offset => offset + 1);
		console.log(offset)
	}, [isView]);

	const dispatch = useDispatch();

	useEffect(() => {
		setOffset(0);

		ipc.invoke(IpcChannel.beatSaverFindMaps, { query, order: sort as FindMapsOrder, page: offset }).then(({ docs }) => {
			dispatch(setBeatSaverMaps(docs));
		});
	}, [query, sort]);

	useEffect(() => {
		ipc.invoke(IpcChannel.beatSaverFindMaps, { query, order: sort as FindMapsOrder, page: offset }).then(({ docs }) => {
			dispatch(updateBeatSaverMaps(docs));
		});
	}, [offset]);

	const handleChangeSorting = (event: SelectChangeEvent) => {
		setSort(event.target.value as TrackSortBy);
	};

	return (
		<Box>
			{query && (
				<Box>
					<Paper sx={{ p: 2, pb: 0, borderRadius: 0 }} elevation={0}>
						<Grid container sx={{ color: "text.primary" }}>
							<Grid item xs={8}>

							</Grid>
							<Grid item xs={4} sx={{ textAlign: "right", mb:1}}>
								<Chip size="small" label={`${maps.length} songs`} color="success" variant="outlined" />
							</Grid>
						</Grid>
					</Paper>

					<Paper sx={{ borderRadius: 0, pr: 2, mb:2 }} elevation={0}>
						<Grid container sx={{ color: "text.primary" }}>
							<Grid item xs={8}>
								BeatSaver result:
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

					<div style={{ height: 20, background: "transparent" }} ref={ref} />
				</Box>
			)}
		</Box>
	);
}
