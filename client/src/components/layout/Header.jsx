import { NavLink, useLocation } from "react-router-dom";

import MenuItemComp from "./MenuItemComp";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// Current value determine if the current page is active to make the background
const navigation = [
	{ name: "הפרוייקטים שלי", to: "/dashboard/my-projects" },
	{ name: "Team", to: "/dashboard/team" },
];

const menuItemsData = {
	className: "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden",
	data: [
		{
			name: "עריכה",
			to: "#",
		},
		{
			name: "התנתקות",
			to: "#",
		},
	],
};

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

const Header = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const { pathname } = useLocation();

	console.log(pathname);
  // TODO: NEED TO COMPARE THE LAST PATH OF THE PATHNAME TO THE URL OF THE NAVLINK

	return (
		<Disclosure dir="rtl" as="nav" className="sticky top-0 z-50 bg-gray-800/90 border-b border-white">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
						{/* Mobile menu button*/}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
							<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
						</DisclosureButton>
					</div>

					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center">
							<img
								alt="Your Company"
								src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
								className="h-8 w-auto"
							/>
						</div>

						<div className="hidden sm:mr-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<NavLink
										key={item.name}
										to={item.to}
										aria-current={pathname.includes("my-projects") ? "page" : undefined}
										className={`rounded-md px-3 py-2 text-sm font-medium ${pathname.includes("my-projects") ? "bg-yellow-100 text-gray-900" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
									>
										{item.name}
									</NavLink>
								))}
							</div>
						</div>
					</div>

					<div className="absolute inset-y-0 right-0 flex items-center pl-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{/* Profile dropdown */}
						<Menu as="div" className="relative ml-3">
							{({ open }) => (
								<>
									<MenuButton
										className={`relative flex rounded-full justify-center items-center size-10 bg-gray-800 text-white text-lg md:text-xl flex justify-center items-center ${open ? "outline-none ring-2 ring-indigo-500" : "outline outline-yellow-100"}`}
									>
										<span className="sr-only">Open user menu</span>
										{`${user.firstName[0]}${user.lastName[0]}`}
									</MenuButton>

									<MenuItems
										transition
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
									>
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

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pt-2 pb-3">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							aria-current={pathname.includes("my-projects") ? "page" : undefined}
							className={`${pathname.includes("my-projects") ? "text-gray-300 hover:bg-white/5 hover:text-white" : "bg-gray-900 text-white"} block rounded-md px-3 py-2 text-base font-medium`}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
};

export default Header;
