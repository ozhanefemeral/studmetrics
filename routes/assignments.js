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
    req.body.mark = 0;

    const assignment = await Assignment.findOne({
        where: {
            studentId: req.query.studentId,
            homeworkId: req.query.homeworkId
        }
    })

    const homework = await assignment.getHomework()
    console.log(homework.dataValues);


    for (let i = 0; i < homework.dataValues.questions.length; i++) {
        console.log(i);

        const question = homework.dataValues.questions[i];
        if (question.answer != undefined) {
            if (assignment.answers[i] == question.answer) {
                req.body.mark += question.point
            }
        }
    }

    await assignment.update(req.body)

    res.send(assignment)
})

module.exports = router;