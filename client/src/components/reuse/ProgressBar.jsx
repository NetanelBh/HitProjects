import { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		// animate bar
		const barTimer = setTimeout(() => {
			setWidth(progress);
		}, 50);

		return () => {
			clearTimeout(barTimer);
		};
	}, [progress]);

	return (
		<div className="w-full h-3 bg-white rounded-full overflow-hidden">
			<div
				className="h-full bg-gradient-to-l from-[#fc00ff] to-[#00dbde] transition-all duration-[2000ms] ease-in-out"
				style={{ width: `${width}%` }}
			/>
		</div>
	);
};

export default ProgressBar;
