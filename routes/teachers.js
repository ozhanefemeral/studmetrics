const express = require('express')
const router = express.Router()

const { Teacher } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    Teacher.create(req.body)
        .then(teacher => {
            res.send(teacher)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:id', auth, async (req, res) => {
    Teacher.findOne({
        where: {
            id: req.params.id
        }
    }).then(teacher => {
        res.send(teacher)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:id', auth, async (req, res) => {
    Teacher.destroy({
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