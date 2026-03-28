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
      className="relative bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-xl p-6 mb-6 flex flex-col items-start w-full"
      dir="rtl"
    >
      {/* Delete Button */}
      <button
        onClick={() => onDelete(course.id)}
        className="absolute top-3 left-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition z-10"
        title="מחק קורס"
      >
        🗑
      </button>

      {/* Course Name */}
      <h2 className="text-2xl font-bold text-white mb-2">{course.name}</h2>

      {/* Semester + Year */}
      <p className="text-sm text-gray-300 mb-4">
        {course.semester} • {course.year}
      </p>

      {/* Progress */}
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between text-xs text-gray-300 w-full">
          <span>התקדמות</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;