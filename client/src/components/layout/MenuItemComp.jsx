import { NavLink } from "react-router-dom";

import {MenuItem} from "@headlessui/react";

const MenuItemComp = ({to, className, name}) => {
	return (
		<MenuItem>
			<NavLink
				to={to}
				className={className}
			>
				{name}
			</NavLink>
		</MenuItem>
	);
};

export default MenuItemComp;
