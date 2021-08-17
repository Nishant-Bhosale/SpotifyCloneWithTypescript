import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import SongPlayer from "./SongPlayer";
import { trackInterface } from "./TrackSearchResult";

interface dashBoardProps {
	code: string;
}

const spotifyWebApi = new SpotifyWebApi({
	clientId: "9ac40adab4e04e5ab80e1bd8fe9c5021",
});

const DashBoard: React.FC<dashBoardProps> = ({ code }) => {
	const [search, setSearch] = useState<string>("");
	const [searchResult, setSearchResult] = useState<
		trackInterface[] | undefined
	>([]);
	const [playingTrack, setPlayingTrack] = useState<
		trackInterface | undefined
	>();
	const accessToken = useAuth(code);

	function chooseTrack(track: trackInterface) {
		setPlayingTrack(track);
		setSearch("");
	}

	useEffect(() => {
		spotifyWebApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResult([]);
		if (!accessToken) return;

		let cancel = false;
		spotifyWebApi
			.searchTracks(search)
			.then((res) => {
				if (cancel) return;
				setSearchResult(
					res.body.tracks?.items.map((track) => {
						const smallestAlbumImage = (
							track.album?.images as SpotifyApi.ImageObject[]
						)?.reduce(
							(
								smallestImg: SpotifyApi.ImageObject,
								currentImg: SpotifyApi.ImageObject,
							): SpotifyApi.ImageObject => {
								if (
									currentImg.height !== undefined &&
									smallestImg.height !== undefined
								) {
									if (currentImg.height < smallestImg.height) return currentImg;
								}
								return smallestImg;
							},
							track.album.images[0],
						);

						return {
							artist: track.artists[0].name,
							title: track.name,
							uri: track.uri,
							albumUrl: smallestAlbumImage.url,
						};
					}),
				);
			})
			.catch((err) => console.log(err));

		return () => {
			cancel = true;
		};
	}, [search, accessToken]);

	return (
		<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
			<Form.Control
				type="search"
				placeholder="Search Songs/Artists"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{searchResult!.map((track) => {
					return (
						<TrackSearchResult
							track={track}
							key={track.uri}
							chooseTrack={chooseTrack}
						/>
					);
				})}
			</div>
			<div>
				<SongPlayer accessToken={accessToken} trackUri={playingTrack} />
			</div>
		</Container>
	);
};

export default DashBoard;
