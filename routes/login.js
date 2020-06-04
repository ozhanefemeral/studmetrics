const express = require('express')
const router = express.Router()
const { School, Teacher, Student } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/teacher', async (req, res) => {
    const id = req.body.teacherId;
    const password = req.body.password;

    const teacher = await Teacher.findOne({
        where: {
            id
        }
    }).catch(err => {
        console.log(err);
        res.send(400)
    })

    const success = await bcrypt.compare(password, teacher.password);

    if (success) {
        const token = jwt.sign({ id: teacher.id, loggedAs: "teacher" }, 'studmetrics')
        res.send({ token });

    } else {
        res.send(400);
    }
})

router.post('/school', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const school = await School.findOne({
        where: {
            email
        }
    }).catch(err => {
        console.log(err);
        res.send(400)
    })

    const success = await bcrypt.compare(password, school.password);

    if (success) {
        const token = jwt.sign({ id: school.id, loggedAs: "school" }, 'studmetrics')
        res.send({ token });

    } else {
        res.sendStatus(400);
    }
})

router.post('/student', async (req, res) => {
    const id = req.body.studentId;
    const password = req.body.password;

    const student = await Student.findOne({
        where: {
            id
        }
    }).catch(err => {
        console.log(err);
        res.send(400)
    })

    const success = await bcrypt.compare(password, student.password);

    if (success) {
        const token = jwt.sign({ id: student.id, loggedAs: "student" }, 'studmetrics')
        res.send({ token, id });

    } else {
        res.send(400);
    }
})

router.post('/parent', async (req, res) => {
    const id = req.body.studentId;
    const password = req.body.password;

    const student = await Student.findOne({
        where: {
            id
        }
    }).catch(err => {
        console.log(err);
        res.send(400)
    })

    const success = await bcrypt.compare(password, student.password);

    if (success) {
        const token = jwt.sign({ id: student.id, loggedAs: "parent" }, 'studmetrics')
        res.send({ token, id });

    } else {
        res.send(400);
    }
})

module.exports = router;
