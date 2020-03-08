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

    await Homework.create({
        "name": "Homework 1",
        "questions": [
            {
                "text": "What is Big O Notation?",
                "answerType": "Klasik",
                "choices": [],
                "point": 0
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
        mark: 50,
        answers: ["It is used to express an algorithm's efficiency", 1]
    })
}
