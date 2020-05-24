const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Student, Offer, Enrolled } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    Student.create(req.body)
        .then(student => {
            res.send(student)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.post('/login', async (req, res) => {
    const studentId = req.body.studentId;
    const password = req.body.password;

    const student = await Student.findOne({
        where: {
            studentId
        }
    }).catch(err => {
        res.send(err);
    })

    const success = await bcrypt.compare(password, student.password);

    if (success) {
        const token = jwt.sign({ id: student.id }, 'studmetrics')
        console.log(token);
        res.send({ token });

    } else {
        res.send(400);
    }
})

router.get('/:studentId', auth, async (req, res) => {
    FindStudentById(req.params.studentId)
        .then(student => {
            res.send(student)
        }).catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.delete('/:studentId', auth, async (req, res) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    }).then(() => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(400).send()
    })
})

router.get('/:studentId/enrolleds', auth, async (req, res) => {
    FindStudentById(req.params.studentId)
        .then(student => {
            return student.getEnrolleds()
        }).then(enrolleds => {
            res.send(enrolleds)
        }).catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:studentId/average/all', auth, async (req, res) => {
    const studentId = req.params.studentId;
    CalculateStudentAverage(studentId)
        .then(average => {
            res.send({ average: average })
        })
        .catch(err => {
            console.log(err);
            res.send(400)
        })
})

router.get('/:studentId/average/:enrolledId', auth, async (req, res) => {
    const enrolledId = req.params.enrolledId

    let sum = 0;

    Enrolled.findOne({
        where: {
            id: enrolledId
        }
    }).then(enrolled => {
        return enrolled.getAssignments()
    }).then(assignments => {
        let filtered = assignments.filter(el => el.isReviewed == true)
        let reviewedCount = filtered.length

        for (let i = 0; i < reviewedCount; i++) {
            const el = filtered[i].mark;

            sum += el;
        }

        let average = sum / reviewedCount

        res.send({ average: average })
    })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })


})

router.post('/:studentId/enroll', auth, async (req, res) => {
    let promises = []

    for (let i = 0; i < req.body.offerIds.length; i++) {
        const el = req.body.offerIds[i];

        Offer.findOne({
            where: {
                id: el
            }
        }).then(offer => {
            promises.push(Enrolled.create({
                studentId: req.params.studentId,
                offerId: offer.dataValues.id,
                courseId: offer.dataValues.courseId
            }))
        })
    }

    Promise.all(promises).then(() => {
        res.send()
    })
})

router.get('/:studentId/ranking', auth, async (req, res) => {
    const studentId = req.params.studentId
    let averagePromises = []
    let averageArray = []
    let average;

    FindStudentById(studentId)
        .then(student => {
            CalculateStudentAverage(studentId)
                .then(avg => { average = avg })
            return student.getSchool()
        })
        .then(school => {
            return school.getStudents()
        })
        .then(students => {
            for (let i = 0; i < students.length; i++) {
                const el = students[i];
                averagePromises.push(CalculateStudentAverage(el.id).then(average => {
                    averageArray.push(average)
                }))
            }

            Promise.all(averagePromises)
                .then(() => {
                    // let uniqueAverages = [...new Set(averageArray)]
                    // let sorted = QuickSort(uniqueAverages)
                    let sorted = QuickSort(averageArray)
                    let reversed = sorted.reverse();
                    let rank = reversed.indexOf(average)

                    res.send({ rank: rank + 1, size: reversed.length })
                })
        })
})

router.get('/:studentId/assignments/ratio', auth, async (req, res) => {
    const studentId = req.params.studentId
    FindStudentById(studentId)
        .then(student => {
            return student.getAssignments()
        })
        .then(assignments => {
            let filtered = assignments.filter(el => el.createdAt.toString() != el.updatedAt.toString())

            res.send({
                all: assignments.length,
                completed: filtered.length
            })
        })
})

router.get('/:studentId/assignments/marks', auth, async (req, res) => {
    const studentId = req.params.studentId
    let marks = []

    FindStudentById(studentId)
        .then(student => {
            return student.getAssignments()
        })
        .then(assignments => {
            let filtered = assignments.filter(el => el.createdAt.toString() != el.updatedAt.toString())
            for (let i = 0; i < filtered.length; i++) {
                const el = filtered[i];
                marks.push({
                    mark: el.mark,
                    homeworkId: el.homeworkId,
                    offerId: el.offerId
                })
            }

            res.send(marks)
        })
})

async function CalculateStudentAverage(studentId) {
    let sum = 0;

    const student = await FindStudentById(studentId)
    const filtered = await GetAssignments(student)

    if (filtered.length == 0) {
        return 0
    }

    let reviewedCount = filtered.length

    for (let i = 0; i < reviewedCount; i++) {
        const el = filtered[i].mark;

        sum += el;
    }

    let average = sum / reviewedCount

    return average;
}

async function GetAssignments(student) {
    let filtered = []
    const assignments = await student.getAssignments()
    filtered = assignments.filter(el => el.isReviewed == true)
    return filtered;
}

async function FindStudentById(studentId) {
    return Student.findOne({
        where: {
            id: studentId
        }
    })
}

function QuickSort(origArray) {
    if (origArray.length <= 1) {
        return origArray;
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = origArray.pop();
        var length = origArray.length;

        for (var i = 0; i < length; i++) {
            if (origArray[i] <= pivot) {
                left.push(origArray[i]);
            } else {
                right.push(origArray[i]);
            }
        }

        return newArray.concat(QuickSort(left), pivot, QuickSort(right));
    }
}

module.exports = router;