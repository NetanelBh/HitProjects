import usersModel from "../models/usersModel.js";

export const getUserByEmail = (email) => {
    return usersModel.findOne({email});
};

export const createUser = (firstName, lastName, email, password) => {
    const user = new usersModel({firstName, lastName, email, password});
    return user.save();
};

export const updateUser = (userId, updatedUser) => usersModel.findOneAndUpdate(userId, { $set: updatedUser }, { new: true });