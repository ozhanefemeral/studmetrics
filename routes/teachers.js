const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Teacher } = require('../models/index');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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

router.post('/login', async (req, res) => {
    const id = req.body.teacherId;
    const password = req.body.password;

    const teacher = await Teacher.findOne({
        where: {
            id
        }
    }).catch(err => {
        console.log(err);
        res.send(400)
    })

    const success = await bcrypt.compare(password, teacher.password);

    if (success) {
        const token = jwt.sign({ id: teacher.id, loggedAs: "teacher" }, 'studmetrics')
        res.send({ token });

    } else {
        res.send(400);
    }
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