import express from "express";

import * as projectsServices from "../services/projectsServices.js";
import { create, getStudentById } from "../services/studentsServices.js";

const router = express.Router();

// Entry point: http://localhost:3000/projects

router.get("/", async (req, res) => {
	try {
		const projects = await projectsServices.getProjectsByLecturerId(req.user.userId);
		if (projects.length === 0) {
			return res.send({ status: false, data: "No projects found" });
		}

		res.send({ status: true, data: projects });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.post("/create", async (req, res) => {
	try {
		const { name, startDate, endDate, semesters } = req.body;
		const lecturer = req.user.userId;
		
		const project = await projectsServices.create(name, startDate, endDate, semesters, lecturer);
		if (!project) {
			return res.send({ status: false, data: "Project creation failed" });
		}

		res.send({ status: true, data: project });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.patch("/update/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;

		const project = await projectsServices.update(projectId, req.body);
		if (!project) {
			return res.send({ status: false, data: "Project update failed" });
		}

		res.send({ status: true, data: project });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.patch("/projects/:projectId/add-student", async (req, res) => {
	const { projectId } = req.params;
	const { studentData } = req.body;

	try {
        let student = await getStudentById(studentData.id);
		// Check if the student created already, if not, create it
		if (!student) {
			try {
				student = await create(
					studentData.firstName,
					studentData.lastName,
					studentData.phone,
					studentData.id,
				);
				if (!student) {
					return res.send({ status: false, data: "Student creation failed" });
				}
			} catch (error) {
				return res.send({ status: false, data: error.message });
			}
		}

		const updatedProject = await projectsServices.addStudent(projectId, student.studentId);
		if (!updatedProject) {
			return res.send({ status: false, data: "Add student to project failed" });
		}

		res.send({ status: true, data: updatedProject });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.delete("/delete/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;

		const deletedProject = await projectsServices.remove(projectId);
		if (!deletedProject) {
			return res.send({ status: false, data: "Project deletion failed" });
		}

		res.send({ status: true, data: deletedProject });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.post("/projects/:projectId/update-meeting", async (req, res) => {
	try {
		const { projectId } = req.params;
		const { lastMeeting } = req.body;

		const updatedProject = await projectsServices.updateLastMeeting(projectId, lastMeeting);
		if (!updatedProject) {
			return res.send({ status: false, data: "Update last meeting failed" });
		}

		res.send({ status: true, data: updatedProject });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

export default router;
