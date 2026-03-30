import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CourseCard from "./CourseCard";

// TODO: Get the courses from the server.

const initialCourses = [
	// { id: 1, name: "מתמטיקה", semester: "א-ב", year: "תשפו", startDate: "2026-02-01", endDate: "2026-03-01" },
	// { id: 2, name: "פיזיקה", semester: "ב-ג", year: "תשפז", startDate: "2027-02-01", endDate: "2027-09-01" },
];

const CoursesPage = () => {
	const { type } = useParams();
	const navigate = useNavigate();

	const [courses, setCourses] = useState(initialCourses);
	const [search, setSearch] = useState("");

	const deleteProjectHandler = (id) => {
		setCourses(courses.filter((course) => course.id !== id));
	};

	const filteredCourses = courses.filter(
		(course) => course.name.startsWith(search)  || course.year.startsWith(search) || course.semester.includes(search),
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
						onClick={() =>navigate("/dashboard/projects/add-project")}
						className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
					>
						הוסף פרוייקט
					</button>
				)}
			</div>

			{/* Courses List */}
			<div className="flex flex-col w-full max-w-3xl">
				{filteredCourses.length === 0 && type === "active" && <h1 className="text-2xl font-bold text-black mt-4 text-center">אין קורסים פעילים</h1>}
				{filteredCourses.length === 0 && type === "completed" && <h1 className="text-2xl font-bold text-black mt-4 text-center">אין קורסים להצגה</h1>}
				
				{filteredCourses.map((course) => (
					<CourseCard key={course.id} course={course} onDelete={deleteProjectHandler} />
				))}
			</div>
		</div>
	);
};

export default CoursesPage;
