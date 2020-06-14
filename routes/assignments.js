const express = require('express')
const router = express.Router()

const { Assignment, Homework, Student } = require('../models/index')
const auth = require('../middleware/auth')

router.get('/:assignmentId', auth, async (req, res) => {
    if (req.query.attributes) {
        Assignment.findOne({
            where: {
                id: req.params.assignmentId
            },
            attributes: req.query.attributes,
            include: [{
                model: Student,
                attributes: ['firstName', 'middleName', 'lastName',]
            }, { model: Homework, attributes: ['average', 'name', 'questions'] }]
        }).then(assignment => {
            res.send(assignment)
        }).catch(err => {
            console.log(err);
            res.status(400).send()
        })

    } else {
        Assignment.findOne({
            where: {
                id: req.params.assignmentId
            },
            include: [{
                model: Student,
                attributes: ['firstName', 'middleName', 'lastName',]
            }, { model: Homework, attributes: ['average', 'name', 'questions'] }]
        }).then(assignment => {
            res.send(assignment)
        }).catch(err => {
            console.log(err);
            res.status(400).send()
        })
    }
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

    const homework = await assignment.getHomework()
    req.body.points = new Array(homework.questions.length)

    for (let i = 0; i < homework.dataValues.questions.length; i++) {
        const question = homework.dataValues.questions[i];
        if (question.answer != undefined) {
            if (req.body.answers[i] == question.answer) {
                req.body.mark += parseFloat(question.point)
                req.body.points[i] = question.point;
                req.body.isCorrect.push(true)
            } else {
                req.body.points[i] = 0;
                req.body.isCorrect.push(false)
            }
        } else {
            req.body.answers[i].point = 0;
            req.body.isCorrect.push(null)
        }
    }

    req.body.isAnswered = true;

    await assignment.update(req.body)
    res.send(assignment)
})

router.patch('/review/:assignmentId', auth, async (req, res) => {
    req.body.mark = 0

    const assignment = await Assignment.findOne({
        where: {
            id: req.params.assignmentId
        }
    })

    for (let i = 0; i < req.body.answers.length; i++) {
        if (assignment.points[i] > 0) {
            req.body.isCorrect[i] = true
        } else {
            assignment.points[i] = 0;
            req.body.isCorrect[i] = false
        }
        req.body.mark += parseFloat(assignment.points[i])
    }

    req.body.isReviewed = true

    await assignment.update(req.body)
    res.send(assignment)
})

module.exports = router;