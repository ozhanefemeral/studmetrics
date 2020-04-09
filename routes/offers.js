const express = require('express');
const router = express.Router();

const { Offer, Enrolled, Student, Homework } = require('../models/index');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    Offer.create(req.body)
        .then(offer => {
            res.send(offer)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
});

router.get('/:offerId', auth, async (req, res) => {
    Offer.findOne({
        where: {
            id: req.params.offerId
        }
    }).then(offer => {
        res.send(offer)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:offerId/homeworks', auth, async (req, res) => {
    Homework.findAll({
        where: {
            offerId: req.params.offerId
        }
    }).then(homeworks => {
        res.send(homeworks)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
});

router.get('/:offerId/students', auth, async (req, res) => {

    let studentPromises = []
    let students = []
    Enrolled.findAll({
        where: {
            offerId: req.params.offerId
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
});

router.delete('/:offerId', auth, async (req, res) => {
    Offer.destroy({
        where: {
            id: req.params.offerId
        }
    }).then(() => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:offerId/unenroll/', auth, async (req, res) => {
    students = req.body
    enrolledPromises = []

    for (let i = 0; i < students.length; i++) {
        const el = students[i];
        enrolledPromises.push(Enrolled.destroy({
            where: {
                studentId: el,
                offerId: req.params.offerId
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

router.get('/:offerId/average/', auth, async (req, res) => {
    const offerId = req.params.offerId;
    let sum = 0;
    let homeworkAverages = []
    let assignmentPromises = []

    Offer.findOne({
        where: {
            id: offerId
        }
    }).then(offer => {
        return offer.getHomeworks()
    }).then(homeworks => {
        for (let i = 0; i < homeworks.length; i++) {
            const el = homeworks[i];
            assignmentPromises.push(el.getAssignments()
                .then(assignments => {

                    let assignmentSum = 0;
                    let filtered = assignments.filter(el => el.isReviewed == true)
                    const length = filtered.length

                    if (length == 0) {
                        return
                    }

                    for (let i = 0; i < length; i++) {
                        const el = filtered[i].mark;
                        assignmentSum += el
                    }

                    homeworkAverages.push(assignmentSum / length)
                }))
        }

        return Promise.all(assignmentPromises)

    }).then(() => {
        for (let i = 0; i < homeworkAverages.length; i++) {
            const el = homeworkAverages[i];
            if (!el) { continue }
            sum += el
        }
        res.send({ average: sum / homeworkAverages.length })
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })
})

module.exports = router;