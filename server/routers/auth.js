import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/sendEmailConfig.js";

import {getUserByEmail, createUser, updateUser} from "../services/usersServices.js";

const router = express.Router();


// /auth/login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.send({status: false, data: 'אימייל לא תקין'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.send({status: false, data: 'סיסמה שגויה'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        // Add the token to the user and remove the password from the object
        const userObj = user.toObject();
        userObj.token = token;
        delete userObj.password;
        res.send({status: true, data: userObj});
    } catch (error) {
        res.send({status: false, data: error.message});
    }
});

// /auth/register
router.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.send({status: false, data: 'כתובת המייל כבר קיימת במערכת'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(firstName, lastName, email, hashedPassword);
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        
        const userObj = user.toObject();
        userObj.token = token;
        delete userObj.password;
        res.send({status: true, data: userObj});
    } catch (error) {
        res.send({status: false, data: error.message});
    }
});

router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;

	try {
		const user = await getUserByEmail(email);
		if (!user) {
			res.send({ status: false, data: "משתמש לא קיים במערכת" });
			return;
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
		const url = `${process.env.REACT_ADDRESS}/reset-password/${token}`;
		await sendEmail(
			email,
			"איפוס סיסמא",
			`
			<p>לחץ על הקישור הבא כדי לאפס את הסיסמא שלך</p>
			<a href="${url}" style="
      			background-color: #28a745;
      			color: white;
      			padding: 12px 24px;
      			text-decoration: none;
      			border-radius: 6px;
      			display: inline-block;
      			font-size: 16px;
    		">איפוס סיסמה</a>
			`
		);

		res.send({ status: true, data: email + " :מייל לאיפוס סיסמא נשלח בהצלחה לכתובת" });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

router.post("/reset-password/:token", async (req, res) => {
	const { token } = req.params;
	const { newPassword } = req.body;
	
	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		const user = await getUserById(decode.userId);
		if (!user) {
			res.send({ status: false, data: "שם משתמש לא קיים" });
			return;
		}

		user.password = await bcrypt.hash(newPassword, 10);
		const updatedUser = await updateUser(user._id, user);
		if (!updatedUser) {
			res.send({ status: false, data: "אירעה בעיה בעדכון הסיסמה" });
			return;
		}

		res.send({ status: true, data: "הסיסמה עודכנה בהצלחה" });
	} catch (error) {
		res.send({ status: false, data: error.message });
	}
});

export default router;