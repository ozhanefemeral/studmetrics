const express = require('express')
const router = express.Router()

const { Course } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    const { courseBody } = req.body;

    courseBody.schoolId = req.body.id

    Course.create(courseBody)
        .then(course => {
            res.send(course)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:id', auth, async (req, res) => {
    Course.findOne({
        where: {
            id: req.params.id
        }
    }).then(course => {
        res.send(course)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:id', auth, async (req, res) => {
    Course.destroy({
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