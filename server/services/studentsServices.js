import * as studentsRepo from "../repos/studentsRepo.js";

export const getStudentById = (studentId) => {
	return studentsRepo.getStudentById(studentId);
};

export const create = (firstName, lastName, phone, studentId) => {
	return studentsRepo.create(firstName, lastName, phone, studentId);
};

export const update = (id, firstName, lastName, phone, studentId) => {
	const studentData = { firstName, lastName, phone, studentId };
	return studentsRepo.update(studentId, studentData);
};

export const remove = (studentId) => {
	return studentsRepo.remove(studentId);
};
