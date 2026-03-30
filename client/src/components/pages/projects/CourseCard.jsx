import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

const CourseCard = ({ course, onDelete }) => {
	const progress = calculateProgress(course.startDate, course.endDate);

	return (
		<div
			className="relative bg-gray-900/50 backdrop-blur-md rounded-3xl border border-red-400 p-6 mb-6 flex flex-col items-start w-full transition duration-300 
             hover:shadow-[0_-3px_6px_rgba(0,0,0,0.1),0_12px_8px_rgba(0,0,0,0.18),_-6px_8px_16px_rgba(0,0,0,0.12),_6px_8px_16px_rgba(0,0,0,0.12)]"
			dir="rtl"
		>
			{/* Delete Button */}
			<FontAwesomeIcon
				icon={faTrash}
				onClick={() => onDelete(course.id)}
				className="absolute top-6 left-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition z-10"
			/>

			{/* Course Name */}
			<h2 className="text-2xl font-bold text-white mb-2">{course.name}</h2>

			{/* Semester + Year */}
			<p className="text-sm text-white mb-4">
				סמסטר {course.semester} • {course.year}
			</p>

			{/* Progress */}
			<div className="flex flex-col gap-1 w-full">
				<div className="flex justify-between text-sm text-white w-full">
					<span>התקדמות</span>
					<span>{progress}%</span>
				</div>
				<div className="w-full h-3 bg-white rounded-full overflow-hidden">
					<div
						className="h-full bg-gradient-to-r from-[#fdeff9] via-[#ec38bc] via-[#800080] to-[#7303c0] transition-all duration-500"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
