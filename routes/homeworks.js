const express = require('express')
const router = express.Router()

const { Homework, Enrolled, Assignment } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {

    offerId = req.body.offerId

    let assignmentPromises = []

    Homework.create(req.body).then(homework => {
        Enrolled.findAll({
            where: {
                offerId: offerId
            }
        }).then(enrolleds => {
            for (let i = 0; i < enrolleds.length; i++) {
                const el = enrolleds[i].dataValues;
                assignmentPromises.push(Assignment.create({
                    homeworkId: homework.dataValues.id,
                    studentId: el.studentId,
                    mark: 0
                }))
            }
        })

        Promise.all(assignmentPromises).then(() => {
            res.send()
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
    Homework.findOne({
        where: {
            id: req.params.homeworkId
        }
    })
        .then(homework => res.send(homework))
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

module.exports = router;