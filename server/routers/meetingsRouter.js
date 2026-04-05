import express from "express";
import * as meetingsServices from "../services/meetingsServices.js";

const router = express.Router();

// Entry point: http://localhost:3000/meetings

router.get("/:projectId", async (req, res) => {
    const {projectId} = req.params;

	try {
		const meetings = await meetingsServices.getMeetings(projectId);
		if (meetings.length === 0) {
			return res.send({ status: false, data: "אין הסטורית פגישות" });
		}

        

		res.send({ status: true, data: meetings });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

export default router;