const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { School, Homework } = require('../models/index');
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

router.get('/teachers', auth, (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    School.findOne({
        where: {
            id
        }
    }).then(school => {
        return school.getTeachers({ attributes: ['firstName', 'middleName', 'lastName', 'id'] });
    }).then(teachers => {
        res.send(teachers)
    })
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const school = await School.findOne({
        where: {
            email
        }
    }).catch(err => {
        console.log(err);
        res.send(400)
    })

    const success = await bcrypt.compare(password, school.password);

    if (success) {
        const token = jwt.sign({ id: school.id, loggedAs: "school" }, 'studmetrics')
        res.send({ token });

    } else {
        res.sendStatus(400);
    }
})

router.get('/:schoolId', auth, async (req, res) => {
    School.findOne({
        where: {
            id: req.params.schoolId
        }
    }).then(school => {
        res.send(school)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:schoolId/courses', auth, async (req, res) => {
    req.head
    School.findOne({
        where: {
            id: req.params.schoolId
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

router.get('/:schoolId/homeworks', auth, async (req, res) => {
    let offerPromises = []
    let homeworkPromises = []
    School.findOne({
        where: {
            id: req.params.schoolId
        }
    }).then(school => {
        return school.getCourses()
    }).then(courses => {
        for (let i = 0; i < courses.length; i++) {
            const el = courses[i];
            offerPromises.push(el.getOffers())
        }

        return Promise.all(offerPromises)
    }).then(offers => {
        let merged = [].concat(...offers)
        for (let i = 0; i < merged.length; i++) {
            const el = merged[i]
            homeworkPromises.push(el.getHomework())
        }

        return Promise.all(homeworkPromises)
    }).then(homeworks => {
        let merged = [].concat(...homeworks)
        res.send(merged)
    })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:schoolId/offers', auth, async (req, res) => {
    School.findOne({
        where: {
            id: req.params.schoolId
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

router.get('/:schoolId/homeworks/average', auth, async (req, res) => {
    const school = await School.findOne({
        where: {
            id: req.params.schoolId
        }
    })

    let homeworkPromises = []
    let offerPromises = []

    const courses = await school.getCourses()
    let allOffers = []

    for (let i = 0; i < courses.length; i++) {
        const currentCourse = courses[i];
        offerPromises.push(currentCourse.getOffers())
    }

    Promise.all(offerPromises)
        .then(data => {
            allOffers = data;
        })
        .then(() => {
            for (let i = 0; i < allOffers.length; i++) {
                for (let j = 0; j < allOffers[i].length; j++) {
                    homeworkPromises.push(Homework.findAll({
                        where: {
                            offerId: allOffers[i][j].id
                        }
                    }))
                }
            }

            Promise.all(homeworkPromises)
                .then(data => {
                    let sum = 0
                    let homeworkCount = 0;

                    let filtered = data.filter(el => el.length > 0)
                    for (let i = 0; i < filtered.length; i++) {
                        for (let j = 0; j < filtered[i].length; j++) {
                            homeworkCount++
                            let currentAverage = filtered[i][j].average
                            if (currentAverage > 0 || currentAverage < 100) {
                                sum += currentAverage
                            }
                        }
                    }

                    if (homeworkCount == 0) {
                        res.send({ average: 0 })
                    } else {
                        let average = sum / homeworkCount

                        res.send({ average, homeworkCount })
                    }
                })
        })

})

module.exports = router;