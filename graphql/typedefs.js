const { gql } = require('apollo-server');

const typedefs = gql`
type Student{
    name: String
    id: ID!
    assignments: [Assignment]
    enrolleds: [Enrolled]
    homeworkRatio: Ratio
    homeworkAverage: Float
}

type Ratio{
    all: Int
    completed: Int
    ratio: Float
}

type Teacher{
    name: String
    offers: [Offer]
}

type Course{
    name: String
}

type Offer{
    code: String
    course: Course
    teacher: Teacher 
    semester: String
}

type Enrolled{
    student: Student
    offer: Offer
    assignments: [Assignment]
}

type Homework{
    name: String
    id: ID!
    offerId: ID!
}

type Assignment{
    id: ID!,
    homework: Homework!,
    mark: Float,
    isReviewed: Boolean
}

type Query {
    hello: String
    students: [Student]
    student(studentId: ID!): Student
    teachers: [Teacher]
    courses: [Course]
    offers: [Offer]
    homeworks: [Homework]
}
`;

module.exports = typedefs;