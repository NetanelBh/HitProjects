import projectsModel from "../models/projectsModel.js";

export const getAll = () => {
    return projectsModel.find();
};

export const getProjectsByLecturerId = (lecturer) => {
    // Return all projects of specific lecturer, with students details
	return projectsModel.find({ lecturer }).populate("students");
};

export const isStudentExistInProject = (projectId, studentId) => {
    return projectsModel.exists({
        _id: projectId,
        students: studentId,
    });
};

export const create = (name, startDate, endDate, semesters, lecturer) => {
    const project = new projectsModel({ name, startDate, endDate, semesters, lecturer, whatsappGroupId: "", reminderSent: false, lastMeetingDate: undefined });
    return project.save();
};

export const update = (projectId, newData) => {
    // update only the given properties, if there are properties that not appear in the newData, they remain unchanged
    return projectsModel.findByIdAndUpdate(projectId, newData, { returnDocument: "after" });
};

export const removeProject = (projectId) => {
    return projectsModel.findByIdAndDelete(projectId);
};

export const addStudent = (projectId, studentId) => {    
    return projectsModel.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { students: studentId } },
        { returnDocument: "after" },
    );
};

export const removeStudent = (projectId, studentId) => {
    return projectsModel.findOneAndUpdate(
        { _id: projectId },
        { $pull: { students: studentId } },
        { returnDocument: "after" },
    );
};