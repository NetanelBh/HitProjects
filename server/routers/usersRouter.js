import express from 'express';
import bcrypt from 'bcrypt';

import * as userServices from '../services/usersServices.js';

const router = express.Router();

// Entry point: http://localhost:3000/users

router.post('/create', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    try {
        const newUser = await userServices.createUser(firstName, lastName, email, password);
        if (!newUser) {
            return res.send({ status: false, data: 'User creation failed' });
        }
        
        res.send({ status: true, data: newUser });
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

router.patch('/update', async (req, res) => {
    const updates = {...req.body};
    const userId = req.user.userId;

    // If the user send new password, hash it before store in DB
    if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
    }

    try {
        const updatedUser = await userServices.updateUser(userId, updates);
        if (!updatedUser) {
            return res.send({ status: false, data: 'User update failed' });
        }
    
        res.send({ status: true, data: updatedUser });
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

export default router;