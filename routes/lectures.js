const express = require('express')
const router = express.Router()

const { Lecture, Enrolled, Student } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    Lecture.create(req.body)
        .then(lecture => {
            res.send(lecture)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:lectureId', auth, async (req, res) => {
    Lecture.findOne({
        where: {
            id: req.params.lectureId
        }
    }).then(lecture => {
        res.send(lecture)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:lectureId/homeworks', auth, async (req, res) => {
    Lecture.findOne({
        where: {
            id: req.params.lectureId
        }
    }).then(lecture => {
        return lecture.getHomeworks()
    }).then(homeworks => {
        res.send(homeworks)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:lectureId/students', auth, async (req, res) => {

    let studentPromises = []
    let students = []
    Enrolled.findAll({
        where: {
            lectureId: req.params.lectureId
        }
    }).then(enrolleds => {
        for (let i = 0; i < enrolleds.length; i++) {
            const el = enrolleds[i].dataValues;
            studentPromises.push(Student.findOne({
                where: {
                    id: el.studentId
                }
            }).then(student => {
                students.push(student)
            }))
        }
        Promise.all(studentPromises).then(() => {
            res.send(students)
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:lectureId', auth, async (req, res) => {
    Lecture.destroy({
        where: {
            id: req.params.lectureId
        }
    }).then(() => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:lectureId/unenroll/', auth, async (req, res) => {
    students = req.body
    enrolledPromises = []

    console.log(req.body);
    

    for (let i = 0; i < students.length; i++) {
        const el = students[i];
        enrolledPromises.push(Enrolled.destroy({
            where: {
                studentId: el,
                lectureId: req.params.lectureId
            }
        }))
    }

    Promise.all(enrolledPromises)
        .then(() => {
            res.send()
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

module.exports = router;