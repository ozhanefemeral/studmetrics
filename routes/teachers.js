const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Teacher, Enrolled } = require('../models/index');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const {teacherBody} = req.body;
    teacherBody.schoolId = req.body.id;

    Teacher.create(teacherBody)
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

router.get('/:id/students', auth, async (req, res) => {
    let offerPromises = [];
    let enrolledPromises = [];

    const id = req.params.id;
    const teacher = await Teacher.findOne({ where: { id } });
    const offers = await teacher.getOffers();

    //Get all enrolleds; for each offer row
    offers.forEach(offer => {
        offerPromises.push(offer.getEnrolleds());
    });

    //When all enrolle
    Promise.all(offerPromises)
        .then(enrolleds => {
            let jointArray = [];

            enrolleds.forEach(element => {
                jointArray = [...jointArray, ...element]
            });

            jointArray.forEach(enrolled => {
                enrolledPromises.push(enrolled.getStudent())
            });
            return Promise.all(enrolledPromises)
        })
        .then(students => {
            res.send(students)
        })
})

router.get('/:id/offers', auth, async (req, res) => {
    const id = req.params.id;
    const teacher = await Teacher.findOne({ where: { id } });
    const offers = await teacher.getOffers();

    res.send(offers);
})
module.exports = router;