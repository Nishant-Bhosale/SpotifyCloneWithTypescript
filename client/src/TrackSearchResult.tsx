import React from "react";

export interface trackInterface {
	artist: string;
	title: string;
	uri: string;
	albumUrl: string;
}

interface searchResultProps {
	track: trackInterface;
	chooseTrack: (track: trackInterface) => void;
}

const TrackSearchResult: React.FC<searchResultProps> = ({
	track,
	chooseTrack,
}) => {
	function handlePlay() {
		chooseTrack(track);
	}

	return (
		<div
			className="d-flex m-2 align-items-center"
			style={{ cursor: "pointer" }}
			onClick={handlePlay}
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
