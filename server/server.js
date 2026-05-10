import "dotenv/config";
import cron from "node-cron";

import app from "./app.js";
import { reminderCheck } from "./scheduler/dailyCheck.js";

const PORT = process.env.PORT || 5000;

cron.schedule("0 9 * * *", async () => {

	console.log("🔔 daily reminder check for projects after 21 days");
	await reminderCheck();
}, {
	// Starts the timer immediately when the server boots
	scheduled: true, 
	// Automatically handles Summer/Winter time
	timezone: "Asia/Jerusalem",
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ✅`);
});