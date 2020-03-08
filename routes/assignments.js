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

    if(req.query.teacher == true){
        req.body.isReviewed = true
    }
    
    req.body.mark = 0;
    req.body.isCorrect = []

    const assignment = await Assignment.findOne({
        where: {
            studentId: req.query.studentId,
            homeworkId: req.query.homeworkId,
        }
    })

    const homework = await assignment.getHomework()

    for (let i = 0; i < homework.dataValues.questions.length; i++) {
        const question = homework.dataValues.questions[i];
        if (question.answer != undefined) {
            if (req.body.answers[i] == question.answer) {
                req.body.mark += question.point
                req.body.isCorrect.push(true)
            } else{
                req.body.isCorrect.push(false)
            }
        } else{
            req.body.isCorrect.push(null)
        }
    }

    await assignment.update(req.body)

    res.send(assignment)
})

module.exports = router;