const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Student, Offer, Enrolled, Teacher, School, Course, Assignment, Homework } = require('../models/index')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    const { studentBody } = req.body;
    studentBody.schoolId = req.body.id;
    Student.create(studentBody)
        .then(student => {
            res.send(student)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/', auth, async (req, res) => {
    const id = req.body.id
    const attributes = ['firstName', 'middleName', 'lastName', 'id']

    if (req.body.loggedAs === 'teacher') {
        let offerPromises = []
        let enrolledPromises = []
        const teacher = await Teacher.findOne({ where: { id } });
        const offers = await teacher.getOffers();

        offers.forEach(offer => {
            offerPromises.push(offer.getEnrolleds());
        });

        Promise.all(offerPromises)
            .then(enrolleds => {
                let jointArray = [];

                enrolleds.forEach(element => {
                    jointArray = [...jointArray, ...element]
                });

                jointArray.forEach(enrolled => {
                    enrolledPromises.push(enrolled.getStudent({ attributes }))
                });
                return Promise.all(enrolledPromises)
            })
            .then(students => {
                res.send(students)
            })
    } else {
        School.findOne({
            where: {
                id
            }
        })
            .then(school => {
                return school.getStudents({ attributes });
            })
            .then(students => {
                res.send(students)
            })
    }
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

router.get('/:studentId', auth, async (req, res) => {
    FindStudentById(req.params.studentId)
        .then(student => {
            res.send(student)
        }).catch(err => {
            console.log(err);
            res.status(400).send()
        })
})

router.get('/:studentId/enrolleds', auth, async (req, res) => {
    FindStudentById(req.params.studentId)
        .then(student => {
            return student.getEnrolleds({
                attributes: ['id', 'marks', 'result'],
                include: [{
                    model: Offer,
                    attributes: ['semester', 'code', 'average'],
                    include: [{
                        model: Course,
                        attributes: ['name']
                    }, {
                        model: Teacher,
                        attributes: ['firstName', 'middleName', 'lastName']
                    }]
                }, {
                    model: Assignment,
                    attributes: ['mark', 'isAnswered', 'isReviewed'],
                    include: {
                        model: Homework,
                        attributes: ['name', 'average']
                    }
                }]
            })
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

router.get('/:studentId/assignments', auth, async (req, res) => {
    const studentId = req.params.studentId
    FindStudentById(studentId)
        .then(student => {
            return student.getAssignments()
        })
        .then(async assignments => {
            let assignmentPromises = [];

            assignments.forEach(assignment => {
                assignmentPromises.push(assignment.getHomework({ attributes: ['name', 'average'] }));
            });

            return { assignments, homeworks: await Promise.all(assignmentPromises) }
        })
        .then(({ assignments, homeworks }) => {

            let combined = [];


            for (let i = 0; i < assignments.length; i++) {
                combined.push({
                    mark: assignments[i].mark,
                    isAnswered: assignments[i].isAnswered,
                    homeworkName: homeworks[i].name
                })
            }

            res.send(combined)
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