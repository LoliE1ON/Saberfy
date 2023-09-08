import React, {useState} from "react";
import {Box, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";

export function Settings() {
	const [clientId, setClientId] = useState("");

	return <Box sx={{margin: 4}}>
		<div>
			<Typography>
				Spotify Client ID
			</Typography>
		</div>

		<TextField
			sx={{ width: "100%", mt: 1}}
			id="outlined-multiline-flexible"
			label="Client ID"
			value={clientId}
			multiline
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				setClientId(event.target.value);
			}}
			maxRows={4}
		/>
	</Box>
}
