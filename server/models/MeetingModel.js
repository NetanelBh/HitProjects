import { Schema, model } from "mongoose";

const meetingSchema = new Schema({
	// 🔗 Relation
	project: {
		type: Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},

	// 📅 Scheduling
	meetingDate: {
		type: Date,
		required: true,
		index: true,
	},
}, {versionKey: false});

const Meeting = model("Meeting", meetingSchema);

export default Meeting;
