import { Schema, model } from "mongoose";

const meetingSchema = new Schema({
	// 🔗 Relation
	project: {
		type: Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},

	// 📅 Scheduling
	date: {
		type: Date,
		required: true,
		index: true,
	},
});

const Meeting = mongoose.model("Meeting", meetingSchema);
