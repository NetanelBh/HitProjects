import { useState } from "react";
import { NavLink } from "react-router-dom";

import { navigation, menuItemsData } from "../utils/utils";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Header = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));

	const burgerClickHandler = () => {
		setMobileOpen((prev) => !prev);
		if(profileOpen) {
			setProfileOpen(false); // Close profile menu if open
		}
	}

	const profileClickHandler = () => {
		setProfileOpen((prev) => !prev);
		if (mobileOpen) {
			setMobileOpen(false); // Close mobile menu if open
		}
	}

	return (
		<nav dir="rtl" className="sticky top-0 z-50 bg-gray-800/90 border-b border-white">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Right: Logo */}
					<div className="flex shrink-0 items-center pt-2">
						<img alt="Website logo" src="/images/web_logo.png" className="h-16 sm:w-16 block" />
					</div>

					{/* Create burger menu when mobile */}
					<div className="sm:hidden relative flex justify-center">
						{/* Burger button */}
						<button onClick={burgerClickHandler} className="text-white text-2xl p-2 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							☰
						</button>

						{/* Animated Mobile menu */}
						<div
							className={`absolute top-full mt-2 bg-gray-700 rounded-md shadow-lg z-50 w-max min-w-[150px] flex flex-col px-2 py-3 transform origin-top transition-all duration-300 ease-out ${
								mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
							} space-y-1`} // <-- added space-y-1 for small gap
						>
							{navigation.map((item) => (
								<NavLink
									key={item.name}
									to={item.to}
									onClick={() => setMobileOpen(false)}
									className={({ isActive }) =>
										classNames(
											isActive
												? "bg-yellow-100 text-gray-900"
												: "text-gray-300 hover:bg-white/10 hover:text-white",
											"block w-full rounded-md px-3 py-2 text-base font-medium text-center",
										)
									}
								>
									{item.name}
								</NavLink>
							))}
						</div>
					</div>

					{/* Center: Navigation */}
					<div className="hidden sm:flex flex-1 justify-start space-x-4 mr-6">
						{navigation.map((item) => (
							<NavLink
								key={item.name}
								to={item.to}
								aria-current={({ isActive }) => (isActive ? "page" : undefined)}
								className={({ isActive }) =>
									classNames(
										isActive
											? "bg-yellow-100 text-gray-900"
											: "text-gray-300 hover:bg-white/5 hover:text-white",
										"rounded-md px-3 py-2 text-sm font-medium",
									)
								}
							>
								{item.name}
							</NavLink>
						))}
					</div>

					{/* Left: Profile Dropdown */}
					<div className="flex items-center justify-start relative">
						<button
							onClick={profileClickHandler}
							className={`relative flex rounded-full border-2 ${profileOpen ? "border-blue-600" : "border-yellow-200"} justify-center items-center size-10 bg-gray-800 text-white text-lg md:text-xl p-2`}
						>
							<span className="sr-only">Open user menu</span>
							{`${user?.firstName[0] || ""}${user?.lastName[0] || ""}`}
						</button>

						{/* Profile dropdown */}
						<div
							className={`absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 flex flex-col px-2 py-3 transform origin-top transition-all duration-300 ease-out ${
								profileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
							} space-y-1`}
						>
							{menuItemsData.data.map((item) => (
								<NavLink
									key={item.name}
									to={item.to}
									onClick={() => setProfileOpen(false)}
									className="block w-full rounded-md px-3 py-2 text-base font-medium text-center text-gray-300 hover:bg-white/10 hover:text-white"
								>
									{item.name}
								</NavLink>
							))}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
