const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        len: [2, 15],
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
    loginId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    password: DataTypes.STRING,
  }, {});

  Teacher.beforeCreate(async (user, options) => {
    user.password = user.lastName.toLowerCase() + user.birthday;
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    console.log(user.password);
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