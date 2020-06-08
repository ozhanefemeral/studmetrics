const bcrypt = require('bcrypt');
const saltRounds = 10;
const Op = require('sequelize').Op;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
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
    teacherId: {
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    average: {
      type: DataTypes.FLOAT
    }
  }, {});

  Teacher.beforeCreate(async (teacher, options) => {
    teacher.password = teacher.lastName.toLowerCase() + teacher.birthday.substr(0, 4);
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

    teacher.teacherId = currentDate.getFullYear() + (teachers.length + 1).toString();
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