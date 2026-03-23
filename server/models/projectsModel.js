import { Schema, model } from "mongoose";

const projectSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		hebrewYear: {
			type: String,
			required: true,
		},
		semesters: {
			A: { type: Boolean, required: true },
			B: { type: Boolean, required: true },
			C: { type: Boolean, required: true },
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
