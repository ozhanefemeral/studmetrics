const express = require('express')
const router = express.Router()

const { Lecture } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    Lecture.create(req.body)
        .then(lecture => {
            res.send(lecture)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:lectureId', auth, async (req, res) => {
    Lecture.findOne({
        where: {
            id: req.params.lectureId
        }
    }).then(lecture => {
        res.send(lecture)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:lectureId/homeworks', auth, async (req, res) => {
    Lecture.findOne({
        where: {
            id: req.params.lectureId
        }
    }).then(lecture => {
        return lecture.getHomeworks()
    }).then(homeworks => {
        res.send(homeworks)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:id', auth, async (req, res) => {
    Lecture.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

module.exports = router;