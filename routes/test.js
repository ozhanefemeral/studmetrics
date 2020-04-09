const express = require('express')
const faker = require('faker/locale/tr')
const router = express.Router()

const { sequelize, Student, Teacher, Course, Offer, Enrolled } = require('../models/index');
const auth = require('../middleware/auth');

router.post('/restart', auth, async (req, res) => {
    sequelize.sync({ force: true }).then(() => {
        res.send();
    });
})

router.post('/students', auth, async (req, res) => {
    let students = []

    for (let index = 0; index < 10; index++) {
        const student = {
            name: faker.name.firstName() + " " + faker.name.lastName(),
            schoolId: req.body.schoolId
        }

        students.push(student)
    }

    Student.bulkCreate(students)
        .then(students => {
            res.send(students)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

router.post('/teachers', auth, async (req, res) => {
    let teachers = []

    for (let index = 0; index < 1; index++) {
        const teacher = {
            name: faker.name.firstName() + " " + faker.name.lastName(),
            schoolId: req.body.schoolId
        }

        teachers.push(teacher)
    }

    Teacher.bulkCreate(teachers)
        .then(teachers => {
            res.send(teachers)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

// router.post('/courses', auth, async (req, res) => {
//     let enrollPromises = []

//     let allTeachers = await Teacher.findAll();

//     const course = {
//         name: faker.lorem.words(2),
//         schoolId: req.body.schoolId
//     }

//     Course.create(course)
//     .then(course => {
//         return Offer.create({
//             semester: "Summer",
//             teacherId: allTeachers[0].id,
//             courseId: course.id
//         })
//     })
//     .then(async offer => {
//         const students = await Student.findAll();
//         for (let i = 0; i < students.length; i++) {
//             const el = students[i]
//             enrolledPromises.push(Enrolled.create({
//                 studentId: el.id,
//                 offerId: offer.id
//             }))          
//         }

//         return Promise.all(enrollPromises)
//     })
//     .then(enrolleds => {
//         res.send(enrolleds);
//     })
//     .catch(err => {
//         res.send(err)
//     })
// })

module.exports = router;