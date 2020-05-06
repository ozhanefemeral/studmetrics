const express = require('express')
const router = express.Router()

const { Enrolled } = require('../models/index')
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

const findEnrolled = async function (studentId, offerId) {
    return Enrolled.findOne({
        where: {
            studentId,
            offerId
        }
    })
}

module.exports = router;