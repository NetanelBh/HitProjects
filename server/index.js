import "dotenv/config";
import cors from "cors";
// Cron for the daily check if should send a reminder
import cron from "node-cron";
import express from "express";

import authRoute from "./routers/auth.js";
import usersRoute from "./routers/usersRouter.js";
import projectRoute from "./routers/projectsRouter.js";
import studentRoute from "./routers/studentsRouter.js";
import meetingRoute from "./routers/meetingsRouter.js";
import mongoConnection from "./DBConnection/mongoConnection.js";
import authenticationMiddleware from "./middleware/authentication.js";

import { reminderCheck } from "./scheduler/dailyCheck.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [process.env.REACT_ADDRESS];
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

mongoConnection();

// Keep railway alive and not make it sleep - using uptimerobot
app.get('/keep-alive', (req, res) => {
  console.log('HIT projects server is alive:', new Date().toISOString());
  res.status(200).send('Great job');
});

cron.schedule("0 9 * * *", async () => {
	console.log("🔔 daily reminder check for projects after 21 days");
	await reminderCheck();
}, {
	// Starts the timer immediately when the server boots
	scheduled: true, 
	// Automatically handles Summer/Winter time
	timezone: "Asia/Jerusalem",
});

app.use("/auth", authRoute);
app.use("/users", authenticationMiddleware, usersRoute);
app.use("/meetings", authenticationMiddleware, meetingRoute);
app.use("/students", authenticationMiddleware, studentRoute);
app.use("/projects", authenticationMiddleware, projectRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ✅`);
});