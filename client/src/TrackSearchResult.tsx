import React from "react";

interface searchResultProps {
	track: {
		artist: string;
		title: string;
		uri: string;
		albumUrl: string;
	};
}

const TrackSearchResult: React.FC<searchResultProps> = ({ track }) => {
	return (
		<div
			className="d-flex m-2 align-items-center"
			style={{ cursor: "pointer" }}
		>
			<img
				src={track.albumUrl}
				style={{ height: "64px", width: "64px" }}
				alt=""
			/>
			<div className="ml-3">
				<div>{track.title}</div>
				<div className="text-muted">{track.artist}</div>
			</div>
		</div>
	);
};

export default TrackSearchResult;
