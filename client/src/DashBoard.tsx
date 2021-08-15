import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

interface dashBoardProps {
	code: string;
}

const spotifyWebApi = new SpotifyWebApi({
	clientId: "9ac40adab4e04e5ab80e1bd8fe9c5021",
});

const DashBoard: React.FC<dashBoardProps> = ({ code }) => {
	const [search, setSearch] = useState<string>("");
	const [searchResult, setSearchResult] = useState([]);
	const accessToken = useAuth(code);

	useEffect(() => {
		spotifyWebApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResult([]);
		if (!accessToken) return;
		console.log("hello");
		console.log(accessToken);
		spotifyWebApi
			.searchTracks(search)
			.then((res) => {
				console.log(res.body.tracks);
			})
			.catch((err) => console.log(err));
	}, [search, accessToken]);

	return (
		<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
			<Form.Control
				type="search"
				placeholder="Search Songs/Artists"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}></div>
			<div>Bottom</div>
		</Container>
	);
};

export default DashBoard;
