import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Loading from "../../ui/Loading";
import DeleteModal from "../../ui/DeleteModal";
import ProgressBar from "../../reuse/ProgressBar";
import useApi from "../../../hooks/useHttpRequest";
import { calculateProgress, exportToExcel, formatFunction } from "../../utils/utils";

const ProjectItem = () => {
	localStorage.removeItem("student");
	const project = JSON.parse(localStorage.getItem("selectedProject"));

	const navigate = useNavigate();

	const [students, setStudents] = useState([]);
	const [lastMeeting, setLastMeeting] = useState("");
	const [meetingsList, setMeetingsList] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState("");
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [animatedProgress, setAnimatedProgress] = useState(0);
	const [modal, setModal] = useState({ type: "regular", isOpen: false, title: "", text: "" });

	const progress = calculateProgress(project.startDate, project.endDate);

	const { get, patch, post, isLoading, data } = useApi();

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

	useEffect(() => {
		const fetchMeetings = async () => {
			try {
				const res = await get(`/meetings/${project._id}`);

				if (res.status) {
					return setMeetingsList(res.data);
				}
				if (res.data === "אין הסטורית פגישות") return;

				return setModal({ type: "regular", isOpen: true, title: "היסטורית מפגשים", text: res.data || res });
			} catch (err) {
				return setModal({ type: "regular", isOpen: true, title: "היסטורית מפגשים", text: err.message });
			}
		};

		fetchMeetings();
	}, [project._id]); // runs once when projectId is set

	const startYear = new Date(project.startDate).getFullYear();
	const endYear = new Date(project.endDate).getFullYear();
	const yearDisplay = startYear === endYear ? startYear : `${startYear}-${endYear}`;

	const addStudentHandler = () => {
		navigate("/dashboard/projects/add-student");
	};

	const editStudentHandler = (student) => {
		setModal({ type: "remove", isOpen: true, title: "מחיקת סטודנט מפרוייקט", text: "האם אתה בטוח?" });
	};

	const deleteStudentHandler = (studentId) => {
		setSelectedStudent(studentId);
		setModal({ type: "remove", isOpen: true, title: "מחיקת סטודנט מפרוייקט" });
	};

	const confirmDeleteStudent = async () => {
		try {
			const resp = await patch(`/projects/remove-student/${project._id}`, { studentId: selectedStudent });
			if (resp.status) {
				localStorage.setItem("selectedProject", JSON.stringify(resp.data));
				setStudents(resp.data.students);
				setModal({ type: "", isOpen: false, title: "", text: "" });
			} else {
				setModal({ type: "regular", isOpen: true, title: "מחיקת משתמש מפרוייקט", text: resp.data });
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

	const addMeetingHandler = async () => {
		// If the user didn't enter date
		if (lastMeeting === "") return;

		// Close the dropdown(if open)
		if (isDropDownOpen) setIsDropDownOpen(false);

		try {
			const resp = await post(`/projects/add-meeting/${project._id}`, { lastMeeting: lastMeeting });
			if (!resp.status) {
				return setModal({ type: "regular", isOpen: true, title: "הוספת פגישה", text: resp.data });
			}

			setLastMeeting("");
			setMeetingsList((prev) => [...prev, resp.data]);
		} catch (error) {
			return setModal({ type: "regular", isOpen: true, title: "הוספת פגישה", text: error.message });
		}
	};

	const closeModalHandler = () => {
		// Only when remove student, we store his id, after the remove, will reset the state
		if (modal.type === "remove") setSelectedStudent("");

		setModal({ type: "", isOpen: false, title: "", text: "" });
	};

	const toggleDropdown = () => {
		if (meetingsList.length === 0) return;

		// Only if there is at least one meeting, change the button
		setIsDropDownOpen((prev) => !prev);
	};

	// Sort the meetings list
	const sortedMeetings = [...meetingsList].sort((a, b) => new Date(b.meetingDate) - new Date(a.meetingDate));

	return (
		<>
			{isLoading && <Loading />}

			{!isLoading && (
				<>
					{/* Modal for errors */}
					{modal.isOpen && modal.type === "regular" && (
						<Modal title={modal.title} text={modal.text} onConfirm={closeModalHandler} />
					)}

					{/* Modal for removing student */}
					{modal.isOpen && modal.type === "remove" && (
						<DeleteModal onDelete={confirmDeleteStudent} onCancel={closeModalHandler} title={modal.title} />
					)}

					{/* If there is no errors or finished loading, show the data */}
					<div className="flex justify-center">
						<div
							dir="rtl"
							className="relative bg-gray-900/50 backdrop-blur-md rounded-3xl border border-red-400 p-6 mb-6 mt-6 flex flex-col gap-4 
								w-full lg:max-w-4xl xl:max-w-5xl mx-auto
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
							<div className="flex flex-col items-start sm:flex-row sm:justify-between w-full">
								<div className="flex flex-col">
									<p className="text-sm text-white font-bold mb-2">הוסף תאריך מפגש</p>

									{/* Right: Add Last Meeting Input with Stylish Calendar */}
									<div className="flex justify-center gap-2">
										<div className="max-w-md">
											<form className="space-y-8">
												<input
													value={lastMeeting}
													id="lastMeetingDate"
													type="date"
													onClick={() => setIsDropDownOpen(false)}
													onChange={(e) => setLastMeeting(e.target.value)}
													className="px-4 py-2 bg-[#d0e7ff] text-black w-full text-md outline-[#007bff] rounded cursor-pointer"
												/>
											</form>
										</div>
										<button
											type="button"
											className="bg-gradient-to-l from-sky-500 via-blue-600 to-indigo-500 hover:brightness-110 active:brightness-110 w-10 h-10 cursor-pointer inline-flex items-center justify-center rounded-full border-none outline-none"
											onClick={addMeetingHandler}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14px"
												fill="#fff"
												className="inline"
												viewBox="0 0 512 512"
											>
												<path
													d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
													data-original="#000000"
												/>
											</svg>
										</button>
									</div>
								</div>

								{/* Left: Meetings History Dropdown */}
								<div className="w-max mt-6">
									<button
										type="button"
										id="dropdownToggle"
										className={`px-6 py-3 rounded-sm text-black ${isDropDownOpen ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 hover:brightness-110 active:brightness-110 text-white" : "bg-[#d0e7ff]"} text-sm font-medium border-0 outline-0 cursor-pointer hover:bg-gradient-to-r hover:from-sky-500 hover:via-blue-600 hover:to-indigo-500 active:brightness-110 hover:text-white active:bg-blue-600`}
										onClick={toggleDropdown}
									>
										{sortedMeetings.length > 0 ? "היסטוריית מפגשים" : "אין היסטורית מפגשים"}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className={`w-3 inline mr-3 transition-transform duration-300 ${
												isDropDownOpen ? "rotate-180" : "rotate-0"
											}`}
											viewBox="0 0 24 24"
										>
											<path
												fillRule="evenodd"
												d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
												clipRule="evenodd"
											/>
										</svg>
									</button>

									{isDropDownOpen && sortedMeetings.length > 0 && (
										<ul
											id="dropdownMenu"
											className="shadow-lg bg-white/80 py-2 z-[1000] min-w-full w-max rounded-sm max-h-96 overflow-auto"
										>
											{sortedMeetings.map((meeting) => (
												<li
													key={meeting._id}
													className="dropdown-item flex items-center py-1 px-6 hover:bg-slate-100 text-blue-700 font-medium text-sm"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-5 h-5 ml-3 inline-block fill-current"
														viewBox="0 0 24 24"
													>
														<path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm-7-9h5v5h-5z" />
													</svg>
													{formatFunction(meeting.meetingDate)}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>

							{/* Actions above table */}
							<div className="flex justify-between items-center mt-4">
								{/* Add student */}
								<button
									onClick={addStudentHandler}
									className="flex items-center gap-2 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 hover:brightness-110 active:brightness-110 text-white px-4 py-2 rounded-xl transition cursor-pointer"
								>
									<FontAwesomeIcon icon={faUserPlus} />
									הוסף סטודנט
								</button>

								{/* Export to excel */}
								<div className="relative group">
									<FontAwesomeIcon
										icon={faFileExcel}
										onClick={onExportExcel}
										className="text-green-300 hover:text-green-400 text-3xl cursor-pointer hover:scale-110 active:scale-110 transition"
									/>

									{/* Excel Tooltip - export to excel */}
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
