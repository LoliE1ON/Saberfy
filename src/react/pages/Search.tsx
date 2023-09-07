import React from "react";

import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import {SearchList} from "components/Search/SearchList";
import { useState } from "react";

export function Search() {
	const [query, setQuery] = useState("");

	return (
		<Box sx={{margin: 4}}>
			<TextField
				sx={{ width: "100%"}}
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
