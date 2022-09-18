import React from "react";
// import logo from "../../../public/images/loader.gif";

const Loader = () => {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<img src="./images/loader.gif" alt="loading..." />
		</div>
	);
};

export default Loader;
