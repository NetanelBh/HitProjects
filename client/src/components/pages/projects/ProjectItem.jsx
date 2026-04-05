import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Loading from "../../ui/Loading";
import ProgressBar from "../../reuse/ProgressBar";
import useApi from "../../../hooks/useHttpRequest";
import { calculateProgress, exportToExcel } from "../../utils/utils";

// TODO: ADD BUTTON TO ADD THE LAST MEETING WHEN THE USER INSERT DATE
// TODO: CREATE IN SERVER ROUTES TO TREAT THE FETCH OF THE MEETINGS HISTORY AND CREATE NEW MEETING

const ProjectItem = () => {
	localStorage.removeItem("student");
	const project = JSON.parse(localStorage.getItem("selectedProject"));

	const navigate = useNavigate();

	const [students, setStudents] = useState([]);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [animatedProgress, setAnimatedProgress] = useState(0);
	const [modal, setModal] = useState({ isOpen: false, title: "", text: "" });

	const progress = calculateProgress(project.startDate, project.endDate);

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
				setStudents(resp.data.students);
			} else {
				setModal({ isOpen: true, title: "מחיקת משתמש מפרוייקט", text: resp.data });
			}
		} catch (error) {}
	};

	const onExportExcel = () => {
		const studentsList = students.map((s, index) => ({
			index: index + 1,
			projectName: project.name,
			name: `${s.firstName} ${s.lastName}`,
			id: s.studentId,
			phone: s.phone,
		}));

		exportToExcel(studentsList);
	};

	const closeModalHandler = () => {
		setModal({ isOpen: false, text: "" });
	};

	const toggleDropdown = () => {
		setIsDropDownOpen((prev) => !prev);
	};

	return (
		<>
			{isLoading && <Loading />}

			{!isLoading && (
				<>
					{modal.isOpen && <Modal title={modal.title} text={modal.text} onConfirm={closeModalHandler} />}

					<div className="flex justify-center">
						<div
							dir="rtl"
							className="relative bg-gray-900/50 backdrop-blur-md rounded-3xl border border-red-400 p-6 mb-6 mt-6 flex flex-col gap-4 
								w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto
								transition duration-300
								hover:shadow-[0_-3px_6px_rgba(0,0,0,0.1),0_12px_8px_rgba(0,0,0,0.18),_-6px_8px_16px_rgba(0,0,0,0.12),_6px_8px_16px_rgba(0,0,0,0.12)]
								active:shadow-[0_-3px_6px_rgba(0,0,0,0.1),0_12px_8px_rgba(0,0,0,0.18),_-6px_8px_16px_rgba(0,0,0,0.12),_6px_8px_16px_rgba(0,0,0,0.12)]"
						>
							{/* Header */}
							<h1 className="text-2xl font-bold text-white">{project.name}</h1>

							{/* Left side: semesters & year */}
							<p className="text-sm text-white">
								סמסטרים {project.semesters} • {yearDisplay}
							</p>

							{/* Progress */}
							<div className="flex flex-col gap-1 w-full mt-4">
								<div className="flex justify-between text-sm text-white w-full">
									<span>התקדמות</span>
									<span className="font-bold">{animatedProgress}%</span>
								</div>
								<ProgressBar progress={progress} />
							</div>

							{/* Sub-header: last meeting + meetings actions */}
							<div className="flex justify-between items-center w-full">
								{/* Right: Meetings History Dropdown */}
								<div className="w-max mt-6">
									<button
										type="button"
										id="dropdownToggle"
										className={`px-6 py-3 rounded-sm text-black ${isDropDownOpen ? "bg-blue-600 text-white" : "bg-[#d0e7ff]"} text-sm font-medium border-0 outline-0 cursor-pointer hover:bg-blue-600 hover:text-white active:bg-blue-600`}
										onClick={toggleDropdown}
									>
										היסטוריית מפגשים
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-3 fill-black inline mr-3"
											viewBox="0 0 24 24"
										>
											<path
												fillRule="evenodd"
												d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
												clipRule="evenodd"
												data-original="#000000"
											/>
										</svg>
									</button>

									{isDropDownOpen && (
										<ul
											id="dropdownMenu"
											className="shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-sm max-h-96 overflow-auto"
										>
											<li className="dropdown-item flex items-center py-1 px-6 hover:bg-slate-100 text-slate-600 font-medium text-sm">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="w-5 h-5 ml-3 inline-block fill-current"
													viewBox="0 0 24 24"
												>
													<path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm-7-9h5v5h-5z" />
												</svg>
												"היסטוריית "
											</li>
										</ul>
									)}
								</div>

								<div className="flex flex-col items-center">
									<p className="text-sm text-white font-bold mb-2">הוסף תאריך מפגש</p>

									{/* Left: Add Last Meeting Input with Stylish Calendar */}
									<div className="max-w-md">
										<form className="space-y-8">
											<div>
												<input
													id="lastMeetingDate"
													type="date"
													className="px-4 py-2 bg-[#d0e7ff] text-black w-full text-md outline-[#007bff] rounded cursor-pointer"
												/>
											</div>
										</form>
									</div>
								</div>
							</div>

							{/* Actions above table */}
							<div className="flex justify-between items-center mt-4">
								<button
									onClick={addStudentHandler}
									className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-700 text-white px-4 py-2 rounded-xl transition cursor-pointer"
								>
									<FontAwesomeIcon icon={faUserPlus} />
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
