import express, { RequestHandler } from "express";

const app = express();
const PORT: number = 5000;

const firstFunc: RequestHandler = (req, res, next) => {
	res.send("esfsa");
};

app.get("/", firstFunc);

app.listen(PORT);
