import usersModel from "../models/usersModel.js";

export const getUserByEmail = (email) => {
	return usersModel.findOne({ email });
};

export const createUser = (firstName, lastName, email, password) => {
	const user = new usersModel({ firstName, lastName, email, password });
	return user.save();
};

export const updateUser = (userId, updates) =>
	usersModel.findByIdAndUpdate({ _id: userId }, { $set: updates }, { new: true, select: "-password" });
