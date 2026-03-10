import * as studentsRepo from "../repos/studentsRepo.js";

export const create = (firstName, lastName, phone, studentId) => {
    return studentsRepo.createStudent(firstName, lastName, phone, studentId);
};

export const update = (studentId, studentData) => {
    return studentsRepo.update(studentId, studentData);
};

export const remove = (studentId) => {
    return studentsRepo.remove(studentId);
}