'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define('Lecture', {
    semester: DataTypes.STRING
  }, {});
  Lecture.associate = function (models) {
    Lecture.hasMany(models.Enrolled, {
      foreignKey: 'lectureId'
    })
    Lecture.hasMany(models.Homework, {
      foreignKey: 'lectureId',
      as: 'homeworks'
    })
    Lecture.belongsTo(models.Course, {
      foreignKey: 'courseId'
    })
  };
  return Lecture;
};