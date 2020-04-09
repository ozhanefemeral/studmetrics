'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      }
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
  return School;
};