import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CourseCard from "./CourseCard";
import useApi from "../../../hooks/useHttpRequest";

// TODO: EACH PROJECT THAT FINISHED, DON'T SHOW IT IN ACTIVE PROJECTS ONLY IN COMPLETED

const CoursesPage = () => {
	const { type } = useParams();
	const navigate = useNavigate();

	const [courses, setCourses] = useState([]);
	const [search, setSearch] = useState("");

	const { get } = useApi();

	useEffect(() => {
		// Get the data from server only once
		const fetchData = async () => {
			try {
				const response = await get("/projects");
				if (response.status) {
					setCourses(response.data);
				}
			} catch (error) {
				console.error("Error fetching courses:", error.message);
			}
		};

		fetchData();
	}, []);

	const deleteProjectHandler = (id) => {
		setCourses(courses.filter((course) => course.id !== id));
	};

	const filteredCourses = courses.filter(
		(course) => 
			course?.name.toLowerCase().startsWith(search) ||
			(new Date(course.startDate)).getFullYear().toString().startsWith(search) ||
			(new Date(course.endDate)).getFullYear().toString().startsWith(search) ||
			course?.semesters.includes(search),
	);

	return (
		<div className="p-6 flex flex-col items-center w-full">
			{/* Search + Add */}
			<div className="flex flex-col w-full sm:flex-row gap-4 mb-6 max-w-3xl items-stretch z-20">
				<input
					id="search"
					type="text"
					placeholder="חיפוש לפי סמסטר/שנה/שם קורס"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="flex-1 p-3 rounded-xl border-2 border-blue-600 bg-gray-500 text-md text-white text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
				{type === "active" && (
					<button
						onClick={() => navigate("/dashboard/projects/add-project")}
						className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
					>
						הוסף פרוייקט
					</button>
				)}
			</div>

			{/* Courses List */}
			<div className="flex flex-col w-full max-w-3xl">
				{filteredCourses.length === 0 && type === "active" && (
					<h1 className="text-2xl font-bold text-black mt-4 text-center">אין קורסים פעילים</h1>
				)}
				{filteredCourses.length === 0 && type === "completed" && (
					<h1 className="text-2xl font-bold text-black mt-4 text-center">אין קורסים להצגה</h1>
				)}

				{filteredCourses.map((course) => (
					<CourseCard key={course._id} course={course} onDelete={deleteProjectHandler} />
				))}
			</div>
		</div>
	);
};

export default CoursesPage;
