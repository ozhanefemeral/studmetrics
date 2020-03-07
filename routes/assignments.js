const express = require('express')
const router = express.Router()

const { Assignment } = require('../models/index')
const auth = require('../middleware/auth')

router.get('/:assignmentId', auth, async (req, res) => {
    console.log("request");

    Assignment.findOne({
        where: {
            id: req.params.assignmentId
        }
    }).then(assignment => {
        res.send(assignment)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.patch('/', auth, async (req, res) => {
    Assignment.findOne({
        where: {
            studentId: req.query.studentId,
            homeworkId: req.query.homeworkId
        }
    }).then(assignment => {
        return assignment.update(req.body)
    }).then(assignment => {
        res.send(assignment)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

module.exports = router;