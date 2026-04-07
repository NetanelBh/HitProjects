import mongoose from "mongoose";
import Project from "../models/projectsModel.js";
import sendEmail from "../utils/sendEmailConfig.js";
import reminderEmailTemplate from "../utils/reminderEmailTemplate.js";
import "dotenv/config";

export const reminderCheck = async () => {
	try {
		const projectsToRemind = await Project.find({
			reminderSent: false,
			lastMeetingDate: {
				$lte: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
			},
		});

		if (!projectsToRemind.length) {
			console.log("No reminders to send ✅");
			return;
		}

		for (const project of projectsToRemind) {
			try {
				const html = reminderEmailTemplate(
					project.name,
					project.lastMeetingDate
				);

				await sendEmail(
					process.env.MY_EMAIL, // send to yourself
					`Reminder: ${project.name}`,
					html
				);

				project.reminderSent = true;
				await project.save();

				console.log(`📧 Reminder sent for "${project.name}"`);
			} catch (err) {
				console.error(`❌ Failed for "${project.name}":`, err.message);
			}
		}
	} catch (err) {
		console.error("Reminder system error:", err.message);
	}
};