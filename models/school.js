const bcrypt = require('bcrypt');
const saltRounds = 10;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      }
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    }
  }, {});

  School.associate = function (models) {
    School.hasMany(models.Teacher, {
      foreignKey: "schoolId"
    })
    School.hasMany(models.Course, {
      foreignKey: "schoolId"
    })
    School.hasMany(models.Student, {
      foreignKey: "schoolId"
    })
  };

  School.beforeCreate(async (school, options) => {
    const hashedPassword = await hashPassword(school.password);
    school.password = hashedPassword;
  })
  return School;
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