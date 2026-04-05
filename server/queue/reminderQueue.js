// reminderQueue.js
import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

// This is the queue that will handle reminder jobs
export const reminderQueue = new Queue("meeting-reminders", {
  connection: redis,
});

console.log("Reminder queue initialized ✅");