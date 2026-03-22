import { Outlet } from "react-router-dom";

import Header from "./Header";

const MainLayout = () => {
	return (
		<>
			<Header />
			<main className="relative w-full min-h-screen overflow-hidden">
				<div className="background_move absolute top-0 left-0 w-full h-full" />

				<Outlet />
			</main>
		</>
	);
};

export default MainLayout;
