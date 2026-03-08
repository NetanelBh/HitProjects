import { Schema, model } from "mongoose";

const studentSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
}, { versionKey: false });

const Student = model("Student", studentSchema);

export default Student;
