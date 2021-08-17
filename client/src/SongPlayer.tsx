import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { trackInterface } from "./TrackSearchResult";

interface songPlayerProps {
	accessToken: string;
	trackUri: trackInterface;
}

const SongPlayer: React.FC<songPlayerProps> = ({ accessToken, trackUri }) => {
	if (!accessToken) return null;
	return (
		<div>
			<SpotifyPlayer
				token={accessToken}
				showSaveIcon
				uris={trackUri ? [trackUri] : []}
			/>
		</div>
	);
};

export default SongPlayer;
