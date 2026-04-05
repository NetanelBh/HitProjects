import express from "express";
import client from "../whatsapp/client.js";

const router = express.Router();

// Entry point: http://localhost:3000/whatsapp

// Get all whatsapp groups to determine the id
router.get("/groups", async (req, res) => {
	try {
		// wait for client to be ready
		if (!client.info?.me) {
			await new Promise((resolve) => client.once("ready", resolve));
		}

		const chats = await client.getChats();
		const groups = chats
			.filter((c) => c.isGroup)
			.map((g) => ({
				name: g.name,
				id: g.id._serialized,
			}));

		res.json(groups);
	} catch (err) {
		console.error("Failed to fetch WhatsApp groups:", err);
		res.status(500).json({ error: "Failed to fetch WhatsApp groups" });
	}
});

export default router;
