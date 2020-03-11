const { School, Student, Teacher, Course, Offer, Enrolled, Homework, Assignment } = require('./models/index')

createDummy()

async function createDummy() {
    await School.create({
        name: "Çukurova Üniversitesi"
    })

    await Teacher.create({
        name: "Selma Ayşe Özel",
        schoolId: 1
    })

    await Student.create({
        name: "Özhan Efe Meral",
        schoolId: 1
    })

    await Student.create({
        name: "Mehmet Öztürk",
        schoolId: 1
    })

    await Course.create({
        name: "Data Structures",
        schoolId: 1
    })

    await Offer.create({
        semester: "fall",
        teacherId: 1,
        courseId: 1
    })

    await Enrolled.create({
        courseId: 1,
        studentId: 1,
        offerId: 1
    })

    await Enrolled.create({
        courseId: 1,
        studentId: 2,
        offerId: 1
    })

    await Homework.create({
        "name": "Homework 1",
        "questions": [
            {
                "text": "What is Big O Notation?",
                "answerType": "Klasik",
                "choices": [],
                "point": 50,
                "answer": null
            },
            {
                "text": "Which one is more efficient?",
                "answerType": "Çoktan Seçmeli",
                "choices": [
                    {
                        "value": "Bubble Sort"
                    },
                    {
                        "value": "Merge Sort"
                    }
                ],
                "point": 50,
                "answer": 1
            }
        ],
        "offerId": 1
    })

    await Assignment.create({
        homeworkId: 1,
        studentId: 1,
        enrolledId: 1,
        mark: 50,
        answers: [{
            value: "It is used to express an algorithm's efficiency",
            point: 0
        }, {
            value: 1,
            point: 50
        }],
        isCorrect: [
            null,
            true
        ],
    })

    await Assignment.create({
        homeworkId: 1,
        studentId: 2,
        enrolledId: 2,
        mark: 0,
        answers: [{
            value: "bla bla bla",
            point: 0
        }, {
            value: 0,
            point: 0
        }],
        isCorrect: [
            null,
            false
        ],
    })
}
