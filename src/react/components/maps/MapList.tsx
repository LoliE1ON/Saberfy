import * as React from "react";
import { useDispatch } from "react-redux";

import { Doc } from "types/beatSaver";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PreviewIcon from "@mui/icons-material/Preview";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Avatar, Box, Button, ButtonGroup, Divider, Paper } from "@mui/material";

export type MapListProps = {
	maps: Doc[];
};

export function MapList({ maps }: MapListProps) {
	const dispatch = useDispatch();

	const [selectedIndex, setSelectedIndex] = React.useState(null);

	const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		setSelectedIndex(index);
	};

	return (
		<div>
			<div style={{ width: "100%" }}>
				{maps.length ? (
					maps.map((item, key) => {
						return (
							<React.Fragment>
								<Paper sx={{ display: "flex", p: 2, gap: 2, borderRadius: 0 }} elevation={1}>
									<Box>
										<Avatar
											sx={{ width: 128, height: 128 }}
											alt={item.name}
											variant="rounded"
											src={item.versions[0].coverURL}
										/>
									</Box>
									<Box sx={{ flexGrow: 1 }}>
										{item.name}
										<Box
											component={"div"}
											sx={{
												color: "text.disabled",
												wordBreak: "break-all",
												fontSize: "smaller",
											}}>
											{item.description}
										</Box>
									</Box>
									<ButtonGroup orientation="vertical" size={"small"}>
										<Button>
											<SaveAltIcon />
										</Button>
										<Button>
											<PlayArrowIcon />
										</Button>
									</ButtonGroup>
								</Paper>
								<Divider light={true} />
							</React.Fragment>
						);
					})
				) : (
					<div>
						<Divider />
						<Paper sx={{ p: 2 }} elevation={0}>
							Maps not found
						</Paper>
					</div>
				)}
			</div>
		</div>
	);
}
