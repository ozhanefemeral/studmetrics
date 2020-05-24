const express = require('express')
const router = express.Router()

const { Homework, Enrolled, Assignment } = require('../models/index')
const auth = require('../middleware/auth')
const faker = require('faker/locale/tr')

router.post('/', auth, async (req, res) => {
    let homeworkId;
    let createdHomework;

    if (!req.body.name) {
        req.body.name = faker.commerce.department()
    }

    let assignmentPromises = []

    Homework.create(req.body).then(homework => {
        homeworkId = homework.id;
        createdHomework = homework;

        return Enrolled.findAll({
            where: {
                offerId: homework.offerId
            }
        })
    }).then(enrolleds => {
        for (let i = 0; i < enrolleds.length; i++) {
            const el = enrolleds[i].dataValues;
            let assignmentBody = {
                homeworkId: homeworkId,
                studentId: el.studentId,
                enrolledId: el.id,
                mark: 0
            }
            
            assignmentPromises.push(Assignment.create(assignmentBody))
        }

        Promise.all(assignmentPromises).then(() => {
            res.send(createdHomework)
        })
    })
})

router.get('/:homeworkId/assignments', auth, async (req, res) => {
    Homework.findOne({
        where: {
            id: req.params.homeworkId
        }
    })
        .then(homework => homework.getAssignments())
        .then(assignments => res.send(assignments))
})

router.get('/:homeworkId', auth, async (req, res) => {
    GetHomeworkById(req.params.homeworkId)
        .then(homework => res.send(homework))
})

router.get('/:homeworkId/course', auth, async (req, res) => {
    GetHomeworkById(req.params.homeworkId)
        .then(homework => {
            return homework.getOffer()
        })
        .then(offer => {
            return offer.getCourse()
        })
        .then(course => {
            res.send(course)
        })
})

router.get('/:homeworkId/average', auth, async (req, res) => {
    let sum = 0

    Homework.findOne({
        where: {
            id: req.params.homeworkId
        }
    })
        .then(homework => {
            return homework.getAssignments()
        }).then(assignments => {
            let filtered = assignments.filter(el => el.isReviewed)
            const length = filtered.length

            if (length == 0) {
                res.send({ average: 0 })
                return
            }

            for (let i = 0; i < length; i++) {
                const el = filtered[i];
                if (!el) continue
                sum += el.mark
            }

            let average = sum / length

            res.send({ average: average })
        })
})

router.delete('/:homeworkId', auth, async (req, res) => {
    Homework.destroy({
        where: {
            id: req.params.homeworkId
        }
    }).then(() => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

async function GetHomeworkById(homeworkId) {
    return Homework.findOne({
        where: {
            id: homeworkId
        }
    })
}

module.exports = router;