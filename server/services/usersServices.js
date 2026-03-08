import * as usersRepo from "../repos/usersRepo.js";

export const getUserByEmail = (email) => {
    return usersRepo.getUserByEmail(email);
};

export const createUser = (fName, lName, email, password) => {
    return usersRepo.createUser(fName, lName, email, password);
};

export const updateUser = (userId, updatedUser) => usersRepo.updateUser(userId, updatedUser);