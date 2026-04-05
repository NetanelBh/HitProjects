import client from "../whatsapp/client.js";
import Project from "../models/projectsModel.js";

export const runReminders = async () => {
	const projectsToRemind = await Project.find({
		reminderSent: false,
		lastMeetingDate: { $lte: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
	});

	if (!projectsToRemind.length) {
		console.log("No reminders to send ✅");
		return;
	}

	const chats = await client.getChats();
	for (const project of projectsToRemind) {
		const chat = chats.find((c) => c.id._serialized === project.whatsappGroupId?.trim());
		if (!chat) continue;
		await chat.sendMessage("Reminder: 21 days since last meeting!");
		project.reminderSent = true;
		await project.save();
	}
};

export const reminderCheck = async () => {
	if (!client.info?.me) {
		console.log("Waiting for WhatsApp client to be ready...");
		return; // skip this run, next interval will try again
	}
	await runReminders();
};
