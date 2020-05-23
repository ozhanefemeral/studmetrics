const { gql } = require('apollo-server');

const typedefs = gql`
type Student{
    firstName: String
    middleName: String
    lastName: String
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
    firstName: String
    middleName: String
    lastName: String
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
    marks: [Mark]
}

type Mark{
    percentage: Int!,
    name: String!,
    points: Float!
}

type Homework{
    name: String
    id: ID!
    offerId: ID!
    lockAfterAnswering: Boolean
}

type Assignment{
    id: ID!,
    homework: Homework!,
    isAnswered: Boolean,
    mark: Float,
    isReviewed: Boolean,
    answers: [Int]
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