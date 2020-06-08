const express = require('express');
const router = express.Router();
const path = require('path');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const { Offer, Enrolled, Student, Homework, Teacher, School } = require('../models/index');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { offerBody } = req.body

    Offer.create(offerBody)
        .then(offer => {
            res.send(offer)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
});

router.get('/', auth, (req, res) => {
    if (req.body.loggedAs === 'teacher') {

    } else {
        School.findOne({
            where: {
                id: req.body.id
            }
        }).then(school => {
            return school.getCourses()
        }).then(courses => {
            let offerPromises = []
            let allOffers = [];
            courses.forEach(course => {
                offerPromises.push(course.getOffers().then(offers => {
                    allOffers.push(...offers)
                }))
            });

            Promise.all(offerPromises).
                then(() => {
                    res.send(allOffers)
                })
        })
            .catch(err => {
                console.log(err);
                res.status(400).send()
            })
    }
})

router.patch('/:offerId', auth, async (req, res) => {
    Offer.findOne({
        where: {
            id: req.params.offerId
        }
    }).then(offer => {
        return offer.getEnrolleds()
        res.send(offer)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:offerId', auth, async (req, res) => {
    Offer.findOne({
        where: {
            id: req.params.offerId
        }
    }).then(offer => {
        res.send(offer)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:offerId/homeworks', auth, async (req, res) => {
    Homework.findAll({
        where: {
            offerId: req.params.offerId
        }
    }).then(homeworks => {
        res.send(homeworks)
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
});

router.get('/:offerId/enrolleds', auth, async (req, res) => {
    Enrolled.findAll({
        where: {
            offerId: req.params.offerId
        },
        attributes: req.query.attributes,
        include: [
            { model: Student, attributes: ['firstName', 'middleName', 'lastName', 'id'] }
        ]
    }).then(enrolleds => {
        res.send(enrolleds)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })
});

router.delete('/:offerId', auth, async (req, res) => {
    Offer.destroy({
        where: {
            id: req.params.offerId
        }
    }).then(() => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.delete('/:offerId/unenroll', auth, async (req, res) => {
    students = req.body
    enrolledPromises = []

    for (let i = 0; i < students.length; i++) {
        const el = students[i];
        enrolledPromises.push(Enrolled.destroy({
            where: {
                studentId: el,
                offerId: req.params.offerId
            }
        }))
    }

    Promise.all(enrolledPromises)
        .then(() => {
            res.send()
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:offerId/average', auth, async (req, res) => {
    const offerId = req.params.offerId;
    let sum = 0;
    let homeworkAverages = []
    let assignmentPromises = []

    Offer.findOne({
        where: {
            id: offerId
        }
    }).then(offer => {
        return offer.getHomeworks()
    }).then(homeworks => {
        for (let i = 0; i < homeworks.length; i++) {
            const el = homeworks[i];
            assignmentPromises.push(el.getAssignments()
                .then(assignments => {

                    let assignmentSum = 0;
                    let filtered = assignments.filter(el => el.isReviewed == true)
                    const length = filtered.length

                    if (length == 0) {
                        return
                    }

                    for (let i = 0; i < length; i++) {
                        const el = filtered[i].mark;
                        assignmentSum += el
                    }

                    homeworkAverages.push(assignmentSum / length)
                }))
        }

        return Promise.all(assignmentPromises)

    }).then(() => {
        for (let i = 0; i < homeworkAverages.length; i++) {
            const el = homeworkAverages[i];
            if (!el) { continue }
            sum += el
        }
        res.send({ average: sum / homeworkAverages.length })
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })
})

router.post('/:offerId/upload', auth, upload.single('file'), async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await Offer.findOne({
        where: {
            id: offerId
        }
    })

    if (!offer.files) {
        offer.files = new Array();
    }

    offer.files.push(req.file.filename);
    await offer.update({ files: offer.files });

    res.send(req.file);
})

router.get('/:offerId/uploads', auth, async (req, res) => {
    const offerId = req.params.offerId;

    const offer = await Offer.findOne({
        where: {
            id: offerId
        }
    })

    res.send(offer)
})

router.get('/:offerId/uploads/:fileName', auth, async (req, res) => {
    const fileName = req.params.fileName

    res.sendFile(path.join(__dirname, '..', 'uploads', fileName))
})

router.get('/', auth, async (req, res) => {
    const id = req.body.id
    if (req.body.loggedAs === 'teacher') {
        Teacher.findOne({
            where: { id }
        })
            .then(teacher => {
                return teacher.getOffers();
            })
            .then(offers => {
                res.send(offers)
            })
    } else {
        let coursePromises = [];
        School.findOne({
            where: {
                id
            }
        })
            .then(school => {
                return school.getCourses();
            })
            .then(courses => {
                courses.forEach(course => {
                    coursePromises.push(course.getOffers())
                });

                return Promise.all(coursePromises);
            })
            .then(offers => {
                let jointArray = [];

                offers.forEach(offer => {
                    jointArray = [...jointArray, ...offer]
                });

                res.send(jointArray);
            })
    }
})

module.exports = router;