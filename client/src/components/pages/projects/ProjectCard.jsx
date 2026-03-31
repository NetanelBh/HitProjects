import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ProgressBar from "../../reuse/ProgressBar";

const calculateProgress = (startDate, endDate) => {
	const now = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (now <= start) return 0;
	if (now >= end) return 100;

	const total = end - start;
	const passed = now - start;

	return Math.round((passed / total) * 100);
};

const ProjectCard = ({ project, onDelete }) => {
	const progress = calculateProgress(project.startDate, project.endDate);
	// Extract the year from the start date
	const startYear = new Date(project.startDate).getFullYear();
	const endYear = new Date(project.endDate).getFullYear();
	const yearDisplay = startYear === endYear ? startYear : `${startYear}-${endYear}`;

	const [animatedProgress, setAnimatedProgress] = useState(0);

	useEffect(() => {
		let start = 0;
		const duration = 2000;
		const intervalTime = 20;
		const step = progress / (duration / intervalTime);

		const counter = setInterval(() => {
			start += step;

			if (start >= progress) {
				start = progress;
				clearInterval(counter);
			}

			setAnimatedProgress(Math.floor(start));
		}, intervalTime);

		return () => clearInterval(counter);
	}, [progress]);

	return (
		<div
			className="relative bg-gray-900/50 backdrop-blur-md rounded-3xl border border-red-400 p-6 mb-6 flex flex-col items-start w-full transition duration-300 
             hover:shadow-[0_-3px_6px_rgba(0,0,0,0.1),0_12px_8px_rgba(0,0,0,0.18),_-6px_8px_16px_rgba(0,0,0,0.12),_6px_8px_16px_rgba(0,0,0,0.12)]"
			dir="rtl"
		>
			{/* Delete Button */}
			<FontAwesomeIcon
				icon={faTrash}
				onClick={() => onDelete(project._id)}
				className="absolute top-6 left-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition z-10"
			/>

			{/* project Name */}
			<h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>

			{/* Semester + Year */}
			<p className="text-sm text-white mb-4">
				סמסטרים {project.semesters} • {yearDisplay}
			</p>

			{/* Progress */}
			<div className="flex flex-col gap-1 w-full">
				<div className="flex justify-between text-sm text-white w-full">
					<span>התקדמות</span>
					<span className="font-bold">{animatedProgress}%</span>
				</div>

				<ProgressBar progress={progress} />
			</div>
		</div>
	);
};

export default ProjectCard;
