import { Schema, model } from "mongoose";

const projectSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		semesters: {
			type: String,
			required: true,
		},
		lecturer: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		students: [
			{
				type: Schema.Types.ObjectId,
				ref: "Student",
			},
		],
	},
	{ versionKey: false },
);

const Project = model("Project", projectSchema);

export default Project;
