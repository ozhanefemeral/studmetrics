const express = require('express')
const router = express.Router()

const { Enrolled, Offer, Teacher, Course } = require('../models/index')
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    query = req.query;

    findEnrolled(query.studentId, query.offerId)
        .then(enrolled => {
            res.send(enrolled)
        });
});

router.patch('/', auth, (req, res) => {
    const { marks, studentId, offerId } = req.body;

    let sum = 0;
    marks.forEach(mark => {
        sum += mark.points * mark.percentage;
    });

    const average = sum / (marks.length * 100);

    if (average == NaN) {
        average = 0;
    }

    findEnrolled(studentId, offerId)
        .then(enrolled => {
            enrolled.marks = marks;
            enrolled.result = average
            return enrolled.save();
        })
        .then(updatedEnrolled => {
            res.send(updatedEnrolled)
        });
})

router.get('/:enrolledId/assignments/marks', auth, (req, res) => {
    const id = req.params.enrolledId;

    Enrolled.findOne({
        where: {
            id
        },
    }).then(enrolled => {
        return enrolled.getAssignments({ attributes: ['mark'] })
    }).then(marks => {
        res.send(marks)
    })
})

router.get('/:enrolledId/assignments', auth, (req, res) => {
    const id = req.params.enrolledId;

    Enrolled.findOne({
        where: {
            id
        },
    }).then(enrolled => {
        return enrolled.getAssignments({})
    }).then(assignments => {
        res.send(assignments)
    })
})

const findEnrolled = async function (studentId, offerId) {
    return Enrolled.findOne({
        where: {
            studentId,
            offerId
        },
        include: {
            model: Offer,
            attributes: [],
            include: [{ model: Course, attributes: ['name', 'id'] }, { model: Teacher, attributes: ['firstName', 'middleName', 'lastName', 'id'] }]
        }
    })
}

module.exports = router;