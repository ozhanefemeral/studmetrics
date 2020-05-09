const express = require('express')
const router = express.Router()

const { Assignment, Homework } = require('../models/index')
const auth = require('../middleware/auth')

router.get('/:assignmentId', auth, async (req, res) => {
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

    req.body.mark = 0;
    req.body.isCorrect = [];
    req.body.isReviewed = false;

    const assignment = await Assignment.findOne({
        where: {
            id: req.params.assignmentId
        }
    });

    console.log(assignment);

    const homework = await assignment.getHomework()

    for (let i = 0; i < homework.dataValues.questions.length; i++) {
        const question = homework.dataValues.questions[i];
        if (question.answer != undefined) {
            if (req.body.answers[i].value == question.answer) {
                req.body.mark += parseInt(question.point)
                req.body.answers[i].point = question.point;
                req.body.isCorrect.push(true)
            } else {
                req.body.answers[i].point = 0;
                req.body.isCorrect.push(false)
            }
        } else {
            req.body.answers[i].point = 0;
            req.body.isCorrect.push(null)
        }
    }

    await assignment.update(req.body)
    res.send(assignment)
})

router.patch('/review/:assignmentId', auth, async (req, res) => {
    try {
        req.body.mark = 0
        req.body.isReviewed = true

        const assignment = await Assignment.findOne({
            where: {
                id: req.params.assignmentId
            }
        })

        for (let i = 0; i < req.body.answers.length; i++) {
            const el = req.body.answers[i];
            if (el.point > 0) {
                req.body.isCorrect[i] = true
            } else {
                el.point = 0;
                req.body.isCorrect[i] = false
            }
            req.body.mark += el.point
        }

        await assignment.update(req.body)
        res.send(assignment)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;