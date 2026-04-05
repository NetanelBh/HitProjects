import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Loading from "../../ui/Loading";
import ProgressBar from "../../reuse/ProgressBar";
import useApi from "../../../hooks/useHttpRequest";
import { calculateProgress } from "../../utils/utils";

// TODO: ADD LAST MEEITING DATE AND OPTION TO EDIT IT(IF WAS MEETING, ADD THE NEW DATE - UPDATE THE SERVER TO REMIND AFTER 21 DAYS even if mail if there is no free whatsapp)

const ProjectItem = () => {
	localStorage.removeItem("student");

	const navigate = useNavigate();
	const [modal, setModal] = useState({ isOpen: false, title: "", text: "" });

	const project = JSON.parse(localStorage.getItem("selectedProject"));

	const [students, setStudents] = useState([]);
	const progress = calculateProgress(project.startDate, project.endDate);
	const [animatedProgress, setAnimatedProgress] = useState(0);

	const { patch, isLoading, data } = useApi();

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
		if (project?.students.length > 0) {
			setStudents(project.students);
		}
	}, [project.students.length]);

	const startYear = new Date(project.startDate).getFullYear();
	const endYear = new Date(project.endDate).getFullYear();
	const yearDisplay = startYear === endYear ? startYear : `${startYear}-${endYear}`;

	const addStudentHandler = () => {
		navigate("/dashboard/projects/add-student");
	};

	const editStudentHandler = (student) => {
		localStorage.setItem("student", JSON.stringify(student));
		navigate("/dashboard/projects/edit-student");
	};

	const deleteStudentHandler = async (studentId) => {
		try {
			const resp = await patch(`/projects/remove-student/${project._id}`, { studentId });
			if (resp.status) {
				localStorage.setItem("selectedProject", JSON.stringify(resp.data));
			} else {
				setModal({ isOpen: true, title: "מחיקת משתמש מפרוייקט", text: resp.data });
			}
		} catch (error) {}
	};

	const onExportExcel = () => {};

	const closeModalHandler = () => {
		setModal({ isOpen: false, text: "" });
	};

	return (
		<>
			{isLoading && <Loading />}

			{!isLoading && (
				<>
					{modal.isOpen && <Modal title={modal.title} text={modal.text} onConfirm={closeModalHandler} />}

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
							<div className="flex justify-between items-center mt-4">
								<button
									onClick={addStudentHandler}
									className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-700 text-white px-4 py-2 rounded-xl transition cursor-pointer"
								>
									<FontAwesomeIcon icon={faPlus} />
									הוסף סטודנט
								</button>

								<div className="relative group">
									<FontAwesomeIcon
										icon={faFileExcel}
										onClick={onExportExcel}
										className="text-green-400 text-3xl cursor-pointer hover:scale-110 active:scale-110 transition"
									/>

									{/* Tooltip */}
									<div
										className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
	                opacity-0 group-hover:opacity-100 transition duration-200
	                bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
									>
										Export to excel
									</div>
								</div>
							</div>

							{/* Students Table */}
							<Table
								headers={["שם", "ת.ז.", "פלאפון", "פעולות"]}
								rows={students}
								onDelete={deleteStudentHandler}
								onEdit={editStudentHandler}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProjectItem;
