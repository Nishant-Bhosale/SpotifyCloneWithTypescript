import React, { useState, useEffect } from "react";
import axios from "axios";

interface responseDataType {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

export default function useAuth(code: string) {
	const [refreshToken, setRefreshToken] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [expiresIn, setExpiresIn] = useState<number>();

	useEffect(() => {
		axios
			.post("http://localhost:5000/login", {
				code,
			})
			.then((res) => {
				const data: responseDataType = res.data;
				setRefreshToken(data.refreshToken);
				setAccessToken(data.accessToken);
				setExpiresIn(data.expiresIn);
			})
			.catch((err) => {
				console.log(err);
				window.location.href = "/";
			});
	}, [code]);

	useEffect(() => {
		if (!refreshToken || !expiresIn) return;

		const interval = setInterval(() => {
			axios
				.post("http://localhost:5000/refresh", {
					refreshToken,
				})
				.then((res) => {
					const data: responseDataType = res.data;
					setAccessToken(data.accessToken);
					setExpiresIn(data.expiresIn);
				})
				.catch((err) => {
					console.log(err);
					window.location.href = "/";
				});
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [expiresIn, refreshToken]);
}
