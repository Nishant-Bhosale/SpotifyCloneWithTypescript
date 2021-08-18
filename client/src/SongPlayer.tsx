import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

interface songPlayerProps {
	accessToken: string;
	trackUri: string;
}

const SongPlayer: React.FC<songPlayerProps> = ({ accessToken, trackUri }) => {
	if (!accessToken) return null;
	return (
		<div>
			<SpotifyPlayer
				token={accessToken}
				showSaveIcon
				uris={trackUri ? [trackUri] : []}
				play={true}
			/>
		</div>
	);
};

export default SongPlayer;
