const bcrypt = require('bcrypt');
const saltRounds = 10;
const Op = require('sequelize').Op;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
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
    average: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {});

  Teacher.beforeCreate(async (teacher, options) => {
    teacher.password = teacher.lastName.toLowerCase() + teacher.dateOfBirth.substr(0, 4);
    const hashedPassword = await hashPassword(teacher.password);
    const currentDate = new Date();
    const teachers = await Teacher.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(currentDate.getFullYear(), 1, 1)
        },
        schoolId: teacher.schoolId
      }
    });

    const teacherNoString = (teachers.length + 1).toString()
    const zeroCount = 4 - teacherNoString.length;
    let lastPart = '0'.repeat(zeroCount);
    
    lastPart += teacherNoString

    teacher.id = parseInt(teacher.schoolId.toString() + "1" + currentDate.getFullYear().toString().substr(2, 2) + lastPart)
    teacher.password = hashedPassword;
  });

  Teacher.associate = function (models) {
    Teacher.belongsTo(models.School, {
      foreignKey: "schoolId"
    })
    Teacher.hasMany(models.Offer, {
      foreignKey: "teacherId"
    })
  };
  return Teacher;
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