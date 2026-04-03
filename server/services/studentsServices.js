import * as studentsRepo from "../repos/studentsRepo.js";

export const getStudentById = (studentId) => {
    return studentsRepo.getStudentById(studentId);
};

export const create = async (firstName, lastName, phone, studentId) => {
    try {
        const student = await getStudentById(studentId);
        
        // If the student already exists, return it with isNew false
        if (student) {
            return { student, isNew: false };
        }
        
        // If the student doesn't exist, cteate it
        try {
            const student = await studentsRepo.create(firstName, lastName, phone, studentId);
            return { student, isNew: true };
        } catch (error) {
            return { student: null, isNew: false };
        }
    } catch (error) {
        return { student: null, isNew: false };
    }
};

export const update = (studentId, studentData) => {
    return studentsRepo.update(studentId, studentData);
};

export const remove = (studentId) => {
    return studentsRepo.remove(studentId);
}