"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express_1.default();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;
const apiInfo = {
    clientId: "9ac40adab4e04e5ab80e1bd8fe9c5021",
    redirectUri: "http://localhost:3000",
    clientSecret: "8c1a00049b6546fd88c6a3696f5fea06",
};
app.post("/refresh", function RequestHandler(req, res, next) {
    const { refreshToken } = req.body;
    apiInfo.refreshToken = refreshToken;
    const spotifyApi = new SpotifyWebApi(apiInfo);
    spotifyApi
        .refreshAccessToken()
        .then((data) => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        });
    })
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});
app.post("/login", function RequestHandler(req, res, next) {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi(apiInfo);
    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
            refreshToken: data.body.refresh_token,
        });
    })
        .catch(() => {
        res.status(400);
    });
});
app.listen(PORT);
