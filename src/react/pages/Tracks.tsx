import React from "react";
import { Navigation } from "components/Navigation";
import { TrackList } from "components/Tracks/TrackList";

export function Tracks() {
	return (
		<div>
			<Navigation />
			<TrackList />
		</div>
	);
}
