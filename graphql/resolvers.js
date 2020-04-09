const { Student, Teacher, Course, Offer, Homework, Assignment, Enrolled } = require('../models/index')

const resolvers = {
    Query: {
        hello: () => {
            return "Hello world."
        },
        students: (parent, args) => {
            return Student.findAll()
        },
        teachers: () => {
            return Teacher.findAll()
        },
        courses: () => {
            return Course.findAll()
        },
        homeworks: () => {
            return Homework.findAll()
        },
        offers: () => {
            return Offer.findAll()
        },
        student: (parent, args) => {
            console.log(args.studentId);
            return Student.findOne({
                where: {
                    id: args.studentId
                }
            })
        }
    },

    Student: {
        assignments: async (parent, args) => {
            const assignments = await Assignment.findAll({
                where: {
                    studentId: parent.id
                }
            })

            return assignments
        },

        homeworkRatio: async (parent, args) => {
            const assignments = await Assignment.findAll({
                where: {
                    studentId: parent.id
                }
            })

            let filtered = assignments.filter(el => el.createdAt.toString() != el.updatedAt.toString())
            return {
                all: assignments.length,
                completed: filtered.length,
                ratio: (assignments.length / filtered.length) * 100
            }
        },

        homeworkAverage: async (parent, args) => {
            let filtered = []
            let sum = 0;

            const assignments = await Assignment.findAll({
                where: {
                    studentId: parent.id
                }
            })

            filtered = assignments.filter(el => el.isReviewed == true)

            if (filtered.length == 0) {
                return 0
            }

            let reviewedCount = filtered.length

            for (let i = 0; i < reviewedCount; i++) {
                sum += filtered[i].mark;;
            }

            let average = sum / reviewedCount

            return average;
        },

        enrolleds: async (parent, args) => {
            const enrolleds = await Enrolled.findAll({
                where: {
                    studentId: parent.id
                }
            })
            return enrolleds;
        }
    },

    Assignment: {
        homework: (parent, args) => {
            return Homework.findOne({
                where: {
                    id: parent.homeworkId
                }
            })
        }
    },

    Teacher: {
        offers: (parent, args) => {
            return Offer.findAll({
                where: {
                    teacherId: parent.id
                }
            })
        }
    },

    Offer: {
        course: (parent, args) => {
            return Course.findOne({
                where: {
                    id: parent.courseId
                }
            })
        },

        teacher: (parent, args) => {
            return Teacher.findOne({
                where: {
                    id: parent.teacherId
                }
            })
        }
    },

    Enrolled: {
        offer: (parent, args) => {
            return Offer.findOne({
                where: {
                    id: parent.offerId
                }
            })
        },

        assignments: (parent, args) => {
            return Assignment.findAll({
                where: {
                    enrolledId: parent.id
                }
            })
        }
    }
};

module.exports = resolvers;