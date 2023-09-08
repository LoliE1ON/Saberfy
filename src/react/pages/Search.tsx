import React from "react";

import {Box, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import {SearchList} from "components/Search/SearchList";
import { useState } from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export function Search() {
	const [query, setQuery] = useState("");

	return (
		<Box sx={{margin: 4}}>
			<div>
				<Typography variant="subtitle1" align={"center"}>
					Search and import maps from BeatSaver

				</Typography>
			</div>

			<TextField
				sx={{ width: "100%", mt: 4}}
				id="outlined-multiline-flexible"
				label="Enter text"
				multiline
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setQuery(event.target.value);
				}}
				maxRows={4}
			/>

			<SearchList query={query}/>
		</Box>
	);
}
