import { Schema, model } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: "Project",
		},
	],
}, {versionKey: false});

const User = model("User", userSchema);

export default User;