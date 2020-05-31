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
    const body = req.body;
    findEnrolled(body.studentId, body.offerId)
        .then(enrolled => {
            enrolled.marks = req.body.marks;
            return enrolled.save();
        })
        .then(enrolledUpdated => {
            res.send(enrolledUpdated)
        });
})

router.get('/:enrolledId/assignments', auth, (req, res) => {
    const id = req.params.enrolledId;

    Enrolled.findOne({
        where: {
            id
        },
    }).then(enrolled => {
        return enrolled.getAssignments()
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