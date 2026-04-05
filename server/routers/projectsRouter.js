import express from "express";

import * as projectsServices from "../services/projectsServices.js";
import { create, getStudentById } from "../services/studentsServices.js";
import { addMeeting } from "../services/meetingsServices.js";
import authentication from "../middleware/authentication.js";

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

// Add student to project
router.patch("/add-student/:projectId", async (req, res) => {
	const { projectId } = req.params;
	const studentData = req.body;

	// Check if the student created already
	let student = await getStudentById(studentData.studentId);
	// If not, create it
	if (!student) {
		try {
			student = await create(
				studentData.firstName,
				studentData.lastName,
				studentData.phone,
				studentData.studentId,
			);

			// Insert the student to the project
			const updatedProject = await projectsServices.addStudent(projectId, student._id).populate("students");
			res.send({ status: true, data: updatedProject });
		} catch (error) {
			res.send({ status: false, data: error.message });
		}
	}
	// If the student already exists in DB, will check the specific project
	else {
		try {
			const isStudentExistInProject = await projectsServices.isStudentExistInProject(projectId, student._id);
			// If the student is in the project already.
			if (isStudentExistInProject) {
				return res.send({ status: false, data: "הסטודנט כבר רשום לפרוייקט הנוכחי" });
			}

			try {
				// Insert the student to the project
				const updatedProject = await projectsServices.addStudent(projectId, student._id).populate("students");
				res.send({ status: true, data: updatedProject });
			} catch (error) {
				res.send({ status: false, data: error.message });
			}
		} catch (error) {
			res.send({ status: false, data: error.message });
		}
	}
});

router.patch("/remove-student/:projectId", async (req, res) => {
	const { projectId } = req.params;
	const { studentId } = req.body;

	try {
		const updatedProject = await projectsServices.removeStudent(projectId, studentId).populate("students");
		if (!updatedProject) {
			return res.send({ status: false, data: "מחיקת הסטודנט מהפרוייקט נכשלה" });
		}

		res.send({ status: true, data: updatedProject });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.delete("/delete/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;

		const deletedProject = await projectsServices.removeProject(projectId);
		if (!deletedProject) {
			return res.send({ status: false, data: "Project deletion failed" });
		}

		res.send({ status: true, data: deletedProject });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.post("/add-meeting/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const { lastMeeting } = req.body;

		const updatedProject = await addMeeting(projectId, lastMeeting);
		if (!updatedProject) {
			return res.send({ status: false, data: "הוספת השיחה נכשלה, אנא נסה שנית" });
		}

		// Update the new data that the project need for whatsapp
		const newData = {lastMeetingDate: lastMeeting, reminderSent: false};
		const latestProject = await projectsServices.update(projectId, newData);
		console.log(latestProject);
		

		res.send({ status: true, data: updatedProject });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

// 🔹 Debug route to check reminder status
router.get("/debug-reminders", authentication, async (req, res) => {
  try {
    const projects = await projectsServices.getAll().select(
      "name lastMeetingDate reminderSent whatsappGroupId"
    );

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
