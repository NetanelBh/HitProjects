import projectsModel from "../models/projectsModel.js";

export const getProjectsByLecturerId = (lecturer) => {
    // Return all projects of specific lecturer, with students details
	return projectsModel.find({ lecturer }).populate("students");
};

export const create = (name, hebrewYear, semesters, lecturer) => {
    const project = new projectsModel({ name, hebrewYear, semesters, lecturer });
    return project.save();
};

export const update = (projectId, newData) => {
    // update only the given properties, if there are properties that not appear in the newData, they remain unchanged
    return projectsModel.findByIdAndUpdate(projectId, newData, { returnDocument: "after" });
};

export const remove = (projectId) => {
    return projectsModel.findByIdAndDelete(projectId);
};

export const addStudent = (projectId, studentId) => {
    return projectsModel.findByIdAndUpdate(
        projectId,
        { $addToSet: { students: studentId } },
        { returnDocument: "after" },
    );
};

export const removeStudent = (projectId, studentId) => {
    return projectsModel.findByIdAndUpdate(
        projectId,
        { $pull: { students: studentId } },
        { returnDocument: "after" },
    );
};