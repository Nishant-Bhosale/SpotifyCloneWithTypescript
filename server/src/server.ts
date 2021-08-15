import express, { RequestHandler } from "express";
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT: number = 5000;

type authResponseType = {
	access_token: string;
	refresh_token: string;
	expires_in: number;
};

app.post("/login", function RequestHandler(req, res, next) {
	const code = (req.body as { code: string }).code;

	const spotifyApi = new SpotifyWebApi({
		clientId: "9ac40adab4e04e5ab80e1bd8fe9c5021",
		redirectUri: "http://localhost:3000",
		clientSecret: "8c1a00049b6546fd88c6a3696f5fea06",
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data: { body: authResponseType }) => {
			res.json({
				accessToken: (data.body as authResponseType).access_token,
				expiresIn: (data.body as authResponseType).expires_in,
				refreshToken: (data.body as authResponseType).refresh_token,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400);
		});
});

app.listen(PORT);
