'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      }
    }
  }, {});
  Course.associate = function (models) {
    Course.belongsTo(models.School, {
      foreignKey: 'schoolId'
    })
    Course.hasMany(models.Lecture, {
      foreignKey: 'courseId'
    })
    Course.hasMany(models.Enrolled, {
      foreignKey: 'courseId'
    })
  };
  return Course;
};