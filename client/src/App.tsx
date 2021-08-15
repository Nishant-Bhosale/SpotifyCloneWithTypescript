import React from "react";
import "./App.css";
import Login from "./Login";
import DashBoard from "./DashBoard";

const code: string | null = new URLSearchParams(window.location.search).get(
	"code",
);

function App() {
	return code ? <DashBoard code={code} /> : <Login />;
}

export default App;
