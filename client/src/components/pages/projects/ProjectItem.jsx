import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";

import ProgressBar from "../../reuse/ProgressBar";
import { calculateProgress } from "../../utils/utils";

const ProjectItem = () => {
	const location = useLocation();
	const { project } = location.state || {};
	const [students, setStudents] = useState([]);

	const progress = calculateProgress(project.startDate, project.endDate);
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

	useEffect(() => {
		if (project?.students) {
			setStudents(project.students);
		}
	}, [project]);

	const startYear = new Date(project.startDate).getFullYear();
	const endYear = new Date(project.endDate).getFullYear();
	const yearDisplay = startYear === endYear ? startYear : `${startYear}-${endYear}`;

	const onAddStudent = () => {};
	const onEditStudent = (student) => {};
	const onDeleteStudent = (studentId) => {};
	const onExportExcel = () => {};

	return (
		<div className="flex justify-center">
			<div
				className="relative bg-gray-900/50 backdrop-blur-md rounded-3xl border border-red-400 p-6 mb-6 mt-6 flex flex-col gap-4 
               w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto
               transition duration-300
               hover:shadow-[0_-3px_6px_rgba(0,0,0,0.1),0_12px_8px_rgba(0,0,0,0.18),_-6px_8px_16px_rgba(0,0,0,0.12),_6px_8px_16px_rgba(0,0,0,0.12)]
               active:shadow-[0_-3px_6px_rgba(0,0,0,0.1),0_12px_8px_rgba(0,0,0,0.18),_-6px_8px_16px_rgba(0,0,0,0.12),_6px_8px_16px_rgba(0,0,0,0.12)]"
				dir="rtl"
			>
				{/* Header */}
				<h1 className="text-2xl font-bold text-white">{project.name}</h1>

				{/* Sub-header: semesters + year + last meeting */}
				<div className="flex justify-between items-center">
					<p className="text-sm text-white">
						סמסטרים {project.semesters} • {yearDisplay}
					</p>
					{project.lastMeeting && (
						<span className="text-sm text-gray-900 bg-yellow-400 px-3 py-1 rounded-lg">
							מפגש אחרון: {project.lastMeeting}
						</span>
					)}
				</div>

				{/* Progress */}
				<div className="flex flex-col gap-1 w-full">
					<div className="flex justify-between text-sm text-white w-full">
						<span>התקדמות</span>
						<span className="font-bold">{animatedProgress}%</span>
					</div>
					<ProgressBar progress={progress} />
				</div>

				{/* Actions above table */}
				<div className="flex justify-between items-center mt-4 mb-2">
					<button
						onClick={onAddStudent}
						className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
					>
						<FontAwesomeIcon icon={faPlus} />
						הוסף סטודנט
					</button>

					<FontAwesomeIcon
						icon={faFileExcel}
						onClick={onExportExcel}
						className="text-green-500 text-2xl cursor-pointer hover:scale-110 transition"
					/>
				</div>

				{/* Students Table */}
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-700">
						<thead className="bg-gray-800">
							<tr>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									שם
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									ת"ז
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									טלפון
								</th>
								<th className="px-4 py-2 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
									פעולות
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700">
							{students.map((student) => (
								<tr key={student._id} className="bg-gray-900 hover:bg-gray-800 transition">
									<td className="px-4 py-2 text-white">
										{student.firstName} {student.lastName}
									</td>
									<td className="px-4 py-2 text-gray-300">{student.studentId}</td>
									<td className="px-4 py-2 text-gray-300">{student.phone}</td>
									<td className="px-4 py-2 flex justify-center gap-2">
										<FontAwesomeIcon
											icon={faPenToSquare}
											onClick={() => onEditStudent(student)}
											className="text-blue-400 cursor-pointer hover:scale-110 transition"
										/>
										<FontAwesomeIcon
											icon={faTrash}
											onClick={() => onDeleteStudent(student._id)}
											className="text-red-500 cursor-pointer hover:scale-110 transition"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProjectItem;
