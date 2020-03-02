'use strict';
module.exports = (sequelize, DataTypes) => {
  const Homework = sequelize.define('Homework', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      }
    },

    questions: DataTypes.ARRAY(DataTypes.JSON)
  }, {});
  Homework.associate = function (models) {
    Homework.belongsTo(models.Lecture, {
      foreignKey: 'lectureId',
      as: 'lecture'
    })
    Homework.hasMany(models.Assignment, {
      foreignKey: 'homeworkId'
    })
  };
  return Homework;
};