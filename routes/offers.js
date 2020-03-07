const express = require('express')
const router = express.Router()

const { Offer, Enrolled, Student } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    Offer.create(req.body)
        .then(offer => {
            res.send(offer)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

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
    Offer.findOne({
        where: {
            id: req.params.offerId
        }
    }).then(offer => {
        return offer.getHomeworks()
    }).then(homeworks => {
        res.send(homeworks)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

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
})

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

    console.log(req.body);
    

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

module.exports = router;