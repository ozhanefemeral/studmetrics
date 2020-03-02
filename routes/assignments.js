const express = require('express')
const router = express.Router()

const { Homework, Enrolled, Assignment } = require('../models/index')
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

router.patch('/:assignmentId', auth, async (req, res) => {
    Assignment.findOne({
        where: {
            id: req.params.assignmentId
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