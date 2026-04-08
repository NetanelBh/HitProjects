import express from 'express';

import * as studendsServices from "../services/studentsServices.js";

// Entry point: http://localhost:3000/students

const router = express.Router();

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone, studentId } = req.body;
    try {
        const student = await studendsServices.update(id, firstName, lastName, phone, studentId);
        if (!student) {
            return res.send({status: false, data: "Student update failed"});
        }

        res.send({status: true, data: student});
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

router.delete("/delete/:studentId", async (req, res) => {
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