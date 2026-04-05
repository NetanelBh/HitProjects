import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loading from "../../ui/Loading";
import ProjectCard from "./ProjectCard";
import Button from "../../reuse/Button";
import DeleteModal from "../../ui/DeleteModal";
import useApi from "../../../hooks/useHttpRequest";

const CoursesPage = () => {
	const { type } = useParams();
	const navigate = useNavigate();

	const [openModal, setOpenModal] = useState(false);
	const [search, setSearch] = useState("");
	const [projects, setProjects] = useState([]);
	// When the user want to delete the project
	const [selectedProjectId, setSelectedProjectId] = useState(null);

	const { get, del, isLoading } = useApi();

	// When we enter this page, we clear our selected project from the last time we clicked on the edit button.
	localStorage.removeItem("selectedProject");

	useEffect(() => {
		// Get the data from server only once
		const fetchData = async () => {
			try {
				const response = await get("/projects");
				if (response.status) {
					setProjects(response.data);
				}
			} catch (error) {
				console.error("Error fetching projects:", error.message);
			}
		};

		fetchData();
	}, []);

	// When the user click on delete button, open the confirmation modal and set the selected project id
	const deleteConfirmationHandler = (id) => {
		setSelectedProjectId(id);
		setOpenModal(true);
	};

	// After the user accepted the deletion, call the delete function and close the modal
	const deleteProjectHandler = async () => {
		setOpenModal(false);
		try {
			const response = await del(`/projects/delete/${selectedProjectId}`);
			if (!response.status) {
				return;
			}

			setProjects(projects.filter((project) => project._id !== selectedProjectId));
		} catch (error) {
			setOpenModal(true);
			return;
		}
	};

	const editProjectHandler = (project) => {
		// Save the project in local storage to use it in edit page
		localStorage.setItem("selectedProject", JSON.stringify(project));
		navigate("/dashboard/projects/item");
	};

	const closeModalHandler = () => {
		setOpenModal(false);
	};

	// Filter the projects according to the user search
	const filteredProjects = projects
		.filter((project) => {
			const lowerSearch = search.toLowerCase();

			// Only include projects that have not ended yet
			if (project?.endDate && new Date(project.endDate) >= new Date() && type === "active") {
				const nameMatch = project?.name?.toLowerCase().startsWith(lowerSearch);
				const startYearMatch = project?.startDate
					? new Date(project.startDate).getFullYear().toString().startsWith(lowerSearch)
					: false;
				const endYearMatch = project?.endDate
					? new Date(project.endDate).getFullYear().toString().startsWith(lowerSearch)
					: false;
				const semestersMatch = project?.semesters
					? project.semesters.toLowerCase().includes(lowerSearch)
					: false;

				return nameMatch || startYearMatch || endYearMatch || semestersMatch;
			} else if (project?.endDate && new Date(project.endDate) < new Date() && type === "completed") {
				const nameMatch = project?.name?.toLowerCase().startsWith(lowerSearch);
				const startYearMatch = project?.startDate
					? new Date(project.startDate).getFullYear().toString().startsWith(lowerSearch)
					: false;
				const endYearMatch = project?.endDate
					? new Date(project.endDate).getFullYear().toString().startsWith(lowerSearch)
					: false;
				const semestersMatch = project?.semesters
					? project.semesters.toLowerCase().includes(lowerSearch)
					: false;

				return nameMatch || startYearMatch || endYearMatch || semestersMatch;
			}

			// If there is no active project
			return false;
		})
		// Sort by start date (newest first)
		.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

	return (
		<div className="p-6 flex flex-col items-center w-full">
			{isLoading && <Loading />}

			{!isLoading && (
				<>
					{openModal && <DeleteModal onDelete={deleteProjectHandler} onCancel={closeModalHandler} title="מחיקת פרוייקט" />}

					{/* Search + Add */}
					<div className="flex flex-col w-full sm:flex-row gap-4 mb-6 max-w-3xl items-stretch z-20">
						<input
							id="search"
							type="text"
							placeholder="חיפוש לפי סמסטר/שנה/שם פרוייקט"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="flex-1 p-2 rounded-xl border-2 border-blue-600 bg-gray-500 text-md text-white text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
						{type === "active" && (
							<Button
								text="הוסף פרוייקט"
								type="button"
								onClick={() => navigate("/dashboard/projects/add-project")}
							/>
						)}
					</div>

					{/* projects List */}
					<div className="flex flex-col w-full max-w-3xl">
						{filteredProjects.length === 0 && type === "active" && (
							<h1 className="text-2xl font-bold text-black mt-4 text-center">אין פרוייקטים פעילים</h1>
						)}
						{filteredProjects.length === 0 && type === "completed" && (
							<h1 className="text-2xl font-bold text-black mt-4 text-center">אין פרוייקטים להצגה</h1>
						)}

						{filteredProjects.map((project) => (
							<ProjectCard
								key={project._id}
								// Tell the component if the project completed or active - to render the edit and delete buttons
								type={type}
								project={project}
								onDelete={(id) => deleteConfirmationHandler(id)}
								onClick={() => editProjectHandler(project)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CoursesPage;
