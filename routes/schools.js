const express = require('express')
const router = express.Router()

const { School } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    School.create(req.body)
        .then(school => {
            res.send(school)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:id', auth, async (req, res) => {
    School.findOne({
        where: {
            id: req.params.id
        }
    }).then(school => {
        res.send(school)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:id/courses', auth, async (req, res) => {
    School.findOne({
        where: {
            id: req.params.id
        }
    }).then(school => {
        return school.getCourses()
    }).then(courses => {
        res.send(courses)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:id/teachers', auth, async (req, res) => {
    School.findOne({
        where: {
            id: req.params.id
        }
    }).then(school => {
        return school.getTeachers()
    }).then(teachers => {
        res.send(teachers)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:id/students', auth, async (req, res) => {
    School.findOne({
        where: {
            id: req.params.id
        }
    }).then(school => {
        return school.getStudents()
    }).then(students => {
        res.send(students)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:id/offers', auth, async (req, res) => {
    School.findOne({
        where: {
            id: req.params.id
        }
    }).then(school => {
        return school.getCourses()
    }).then(courses => {
        let promises = []
        let allOffers = []
        for (let i = 0; i < courses.length; i++) {
            const el = courses[i];
            promises.push(el.getOffers().then(offers => {
                allOffers.push(...offers)
            }))
        }
        Promise.all(promises).then(() => {
            res.send(allOffers)
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

module.exports = router;