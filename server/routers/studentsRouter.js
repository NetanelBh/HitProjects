import express from 'express';

import * as studendsServices from "../services/studentsServices.js";

// Entry point: http://localhost:3000/students

const router = express.Router();

router.post("/create", async (req, res) => {
    const { firstName, lastName, phone, studentId } = req.body;
    try {
        const student = await studendsServices.createStudent(firstName, lastName, phone, studentId);
        if (!student) {
            return res.send({status: false, data: "Student creation failed"});
        }

        res.send({status: true, data: student});
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

router.patch("/update/:id", async (req, res) => {
    const { studentId } = req.params;
    const { firstName, lastName, phone } = req.body;
    try {
        const student = await studendsServices.update(studentId, firstName, lastName, phone);
        if (!student) {
            return res.send({status: false, data: "Student update failed"});
        }

        res.send({status: true, data: student});
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await studendsServices.remove(studentId);
        if (!student) {
            return res.send({status: false, data: "Student deletion failed"});
        }

        res.send({status: true, data: student});
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

export default router;