import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoute from "./routers/auth.js";
import usersRoute from "./routers/usersRouter.js";
import projectRoute from "./routers/projectsRouter.js";
import studentRoute from "./routers/studentsRouter.js";
import mongoConnection from "./DBConnection/mongoConnection.js";
import authenticationMiddleware from "./middleware/authentication.js";

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

app.use("/auth", authRoute);
app.use("/users", authenticationMiddleware, usersRoute);
app.use("/students", authenticationMiddleware, studentRoute);
app.use("/projects", authenticationMiddleware, projectRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});