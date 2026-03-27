import { NavLink } from "react-router-dom";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import MenuItemComp from "./MenuItemComp";
import { navigation, menuItemsData } from "../utils.js/utils";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Header = () => {
	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<nav dir="rtl" className="sticky top-0 z-50 bg-gray-800/90 border-b border-white">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Right: Logo */}
					<div className="flex shrink-0 items-center pt-2">
						<img
							alt="Website logo"
							src="/images/web_logo.png"
							className="h-16 sm:w-16 block"
						/>
					</div>

					{/* Center: Navigation */}
					<div className="flex flex-1 justify-center space-x-4">
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
					<div className="flex items-center">
						<Menu as="div" className="relative ml-3">
							{({ open }) => (
								<>
									<MenuButton
										className={`relative flex rounded-full justify-center items-center size-10 bg-gray-800 text-white text-lg md:text-xl ${open ? "outline-none ring-2 ring-cyan-400" : "outline ring-2 outline-yellow-100"}`}
									>
										<span className="sr-only">Open user menu</span>
										{`${user?.firstName[0] || ""}${user?.lastName[0] || ""}`}
									</MenuButton>

									<MenuItems className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg outline outline-black/5">
										{menuItemsData.data.map((item) => (
											<MenuItemComp
												key={item.name}
												to={item.to}
												className={menuItemsData.className}
												name={item.name}
											/>
										))}
									</MenuItems>
								</>
							)}
						</Menu>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
