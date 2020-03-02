const express = require('express')
const router = express.Router()

const { Course } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    Course.create(req.body)
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

module.exports = router;