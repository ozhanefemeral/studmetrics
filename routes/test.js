const express = require('express')
const faker = require('faker/locale/tr')
const router = express.Router()

const { sequelize, Student, Teacher, Course, Offer, Enrolled } = require('../models/index');
const auth = require('../middleware/auth');

router.post('/restart', async (req, res) => {
    sequelize.sync({ force: true }).then(() => {
        res.send();
    });
})

router.post('/students', auth, async (req, res) => {
    let students = []

    for (let i = 0; i < 10; i++) {
        await Student.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            schoolId: req.body.id,
            dateOfBirth: new Date().toISOString().substr(0, 10),
            studentId: i
        }).then(student => {
            students.push(student)
        })
    }

    res.send(students)
})

router.post('/teachers', auth, async (req, res) => {
    Teacher.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        schoolId: req.body.id,
        dateOfBirth: new Date().toISOString().substr(0, 10)
    })
        .then(teacher => {
            res.send(teacher)
        })
})

router.post('/courses', auth, async (req, res) => {
    let enrollPromises = []

    let allTeachers = await Teacher.findAll();

    const course = {
        name: faker.lorem.words(2),
        schoolId: req.body.schoolId
    }

    Course.create(course)
        .then(course => {
            return Offer.create({
                semester: "Summer",
                teacherId: allTeachers[0].id,
                courseId: course.id
            })
        })
        .then(async offer => {
            let students = await Student.findAll();
            return { offer, students }
        })
        .then((offer, students) => {
            for (let i = 0; i < students.length; i++) {
                const el = students[i]
                enrolledPromises.push(Enrolled.create({
                    studentId: el.id,
                    offerId: offer.id
                }))
            }

            return Promise.all(enrollPromises)
        })
        .then(enrolleds => {
            res.send(enrolleds);
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router;