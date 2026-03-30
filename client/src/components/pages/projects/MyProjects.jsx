import { useState } from "react";
import { useParams } from "react-router-dom";

import CourseCard from "./CourseCard";

const initialCourses = [
	{ id: 1, name: "מתמטיקה", semester: "סמסטר א'", year: 2026, startDate: "2026-02-01", endDate: "2026-03-01" },
	{ id: 2, name: "פיזיקה", semester: "סמסטר ב'", year: 2027, startDate: "2027-02-01", endDate: "2027-09-01" },
];

const CoursesPage = () => {
	const { type } = useParams();

	const [courses, setCourses] = useState(initialCourses);
	const [search, setSearch] = useState("");

	const handleAddCourse = () => {
		const newCourse = {
			id: Date.now(),
			name: "קורס חדש",
			semester: "סמסטר חדש",
			year: 2027,
			startDate: "2027-03-01",
			endDate: "2027-08-01",
		};
		setCourses([newCourse, ...courses]);
	};

	const handleDelete = (id) => {
		setCourses(courses.filter((course) => course.id !== id));
	};

	const filteredCourses = courses.filter(
		(course) => course.name.includes(search) || course.semester.includes(search),
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
						onClick={handleAddCourse}
						className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
					>
						הוסף קורס
					</button>
				)}
			</div>

			{/* Courses List */}
			<div className="flex flex-col w-full max-w-3xl">
				{filteredCourses.map((course) => (
					<CourseCard key={course.id} course={course} onDelete={handleDelete} />
				))}
			</div>
		</div>
	);
};

export default CoursesPage;
