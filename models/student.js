const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const saltRounds = 10;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = Sequelize.Op

  const Student = sequelize.define('Student', {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT(11)
    },
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
    dateOfBirth: {
      required: true,
      type: DataTypes.DATEONLY
    },
    password: DataTypes.STRING,
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
    student.password = student.lastName.toLowerCase() + student.dateOfBirth.substr(0, 4);
    const currentDate = new Date();

    const students = await Student.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(currentDate.getFullYear(), 1, 1)
        },
        schoolId: student.schoolId
      }
    });

    const studentNoString = (students.length + 1).toString()

    const zeroCount = 4 - studentNoString.length;
    let lastPart = '0'.repeat(zeroCount);

    lastPart += studentNoString

    const hashedPassword = await hashPassword(student.password);
    student.password = hashedPassword;
    student.id = parseInt(student.schoolId.toString() + "0" + currentDate.getFullYear().toString().substr(2, 2) + lastPart)
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