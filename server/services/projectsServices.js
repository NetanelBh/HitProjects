import * as projectsRepo from '../repos/projectsRepo.js';

export const getProjectsByLecturerId = (lecturerId) => {
    return projectsRepo.getProjectsByLecturerId(lecturerId);
};

export const isStudentExistInProject = (projectId, studentId) => {
    return projectsRepo.isStudentExistInProject(projectId, studentId);
}

export const create = (name, startDate, endDate, semesters, lecturer) => {
    return projectsRepo.create(name, startDate, endDate, semesters, lecturer);
};

export const update = (projectId, newData) => {
    return projectsRepo.update(projectId, newData);
};

export const removeProject = (projectId) => {
    return projectsRepo.removeProject(projectId);
};

export const addStudent = (projectId, studentId) => {
    return projectsRepo.addStudent(projectId, studentId);
};

export const removeStudent = (projectId, studentId) => {
    return projectsRepo.removeStudent(projectId, studentId);
};