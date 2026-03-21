import StudentsModel from "../models/studentsModel.js";

export const getStudentById = (studentId) => {
	return StudentsModel.findById(studentId);
};

export const createStudent = (firstName, lastName, phone, studentId) => {
	const newStudent = new StudentsModel({ firstName, lastName, phone, studentId });
	return newStudent.save();
};

export const update = (studentId, studentData) => {
	return StudentsModel.findByIdAndUpdate({ _id: studentId }, studentData, { returnDocument: "after" });
};

export const remove = (studentId) => {
	return StudentsModel.findByIdAndDelete({ _id: studentId });
};
