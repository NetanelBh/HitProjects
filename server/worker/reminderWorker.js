import mongoose from "mongoose";
import client from "../whatsapp/client.js";
import Project from "../models/projectsModel.js";
import "dotenv/config";

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected ✅");

// Main reminder function
export async function runReminders() {
  // Wait for WhatsApp client
  if (!client.info?.me) {
    console.log("Waiting for WhatsApp client to be ready...");
    await new Promise((resolve) => client.once("ready", resolve));
  }
  console.log("WhatsApp client ready ✅");

  // Find projects that need reminders (21 days passed and not sent)
  const projectsToRemind = await Project.find({
    lastMeetingDate: { $lte: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    reminderSent: false,
  });

  if (projectsToRemind.length === 0) {
    console.log("No reminders to send today ✅");
    return;
  }

  const chats = await client.getChats(); // fetch all chats once

  for (const project of projectsToRemind) {
    try {
      const chat = chats.find((c) => c.id._serialized === project.whatsappGroupId?.trim());
      if (!chat) {
        console.error(`❌ Chat not found for project "${project.name}"`);
        continue;
      }

      const message = `Reminder: It's been 21 days since your last meeting!`;
      await chat.sendMessage(message);

      console.log(`✅ Reminder sent to project "${project.name}"`);

      project.reminderSent = true; // mark as sent
      await project.save();
    } catch (err) {
      console.error(`Failed to send reminder for project "${project.name}":`, err.message);
    }
  }
}

// Optional: run immediately if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runReminders().then(() => console.log("finished"));
}