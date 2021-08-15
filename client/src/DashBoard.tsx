import React from "react";
import useAuth from "./useAuth";

interface dashBoardProps {
	code: string;
}

const DashBoard: React.FC<dashBoardProps> = ({ code }) => {
	const accessToken = useAuth(code);
	return <div>{code}</div>;
};

export default DashBoard;
