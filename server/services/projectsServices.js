import * as projectsRepo from '../repos/projectsRepo.js';

export const getProjectsByLecturerId = (lecturerId) => {
    return projectsRepo.getProjectsByLecturerId(lecturerId);
};

export const create = (name, year, semesters, lecturer) => {
    return projectsRepo.create(name, year, semesters, lecturer);
};

export const update = (projectId, newData) => {
    return projectsRepo.update(projectId, newData);
};
export const remove = (projectId) => {
    return projectsRepo.remove(projectId);
};

export const addStudent = (projectId, studentId) => {
    return projectsRepo.addStudent(projectId, studentId);
};

export const removeStudent = (projectId, studentId) => {
    return projectsRepo.removeStudent(projectId, studentId);
};