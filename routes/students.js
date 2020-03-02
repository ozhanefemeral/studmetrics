const express = require('express')
const router = express.Router()

const { Student, Lecture, Enrolled } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    Student.create(req.body)
        .then(student => {
            res.send(student)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:id', auth, async (req, res) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    }).then(student => {
        res.send(student)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:id', auth, async (req, res) => {
    Student.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:id/assignments', auth, async (req, res) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    }).then(student => {
        return student.getAssignments()
    }).then(assignments => {
        res.send(assignments)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:id/enrolleds', auth, async (req, res) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    }).then(student => {
        console.log(student);
        return student.getEnrolleds()
    }).then(enrolleds => {
        res.send(enrolleds)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.post('/:id/enroll', auth, async (req, res) => {
    let promises = []

    for (let i = 0; i < req.body.lectureIds.length; i++) {
        const el = req.body.lectureIds[i];
        console.log(el);

        Lecture.findOne({
            where: {
                id: el
            }
        }).then(lecture => {
            promises.push(Enrolled.create({
                studentId: req.params.id,
                lectureId: lecture.dataValues.id,
                courseId: lecture.dataValues.courseId
            }))
        })
    }

    Promise.all(promises).then(() => {
        res.send()
    })
})

module.exports = router;