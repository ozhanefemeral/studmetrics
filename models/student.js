const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const saltRounds = 10;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = Sequelize.Op

  const Student = sequelize.define('Student', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 15]
      },
      required: true
    },
    middleName: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 15],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 15]
      },
      required: true
    },
    birthday: {
      required: true,
      type: DataTypes.DATEONLY
    },
    password: DataTypes.STRING,
    studentId: {
      type: DataTypes.STRING
    }
  }, {});
  Student.associate = function (models) {
    Student.belongsTo(models.School, {
      foreignKey: "schoolId"
    })
    Student.hasMany(models.Assignment, {
      foreignKey: "studentId"
    })
    Student.hasMany(models.Enrolled, {
      foreignKey: "studentId"
    })
  };

  Student.beforeCreate(async (student, options) => {
    student.password = student.lastName.toLowerCase() + student.birthday.substr(0, 4);

    const currentDate = new Date();

    const students = await Student.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(currentDate.getFullYear(), 1, 1)
        },
        schoolId: student.schoolId
      }
    });

    student.studentId = currentDate.getFullYear() + (students.length + 1).toString();
    const hashedPassword = await hashPassword(student.password);
    student.password = hashedPassword;
  });

  return Student;
};

async function hashPassword(password) {

  return bcrypt.genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hashedPassword => {
      return hashedPassword
    })
}