'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    mark: DataTypes.INTEGER,
    answers: DataTypes.ARRAY(DataTypes.JSON),
    isCorrect: DataTypes.ARRAY(DataTypes.BOOLEAN),
    points: { type: DataTypes.ARRAY(DataTypes.FLOAT), defaultValue: [].fill(0) },
    isAnswered: { type: DataTypes.BOOLEAN, defaultValue: false },
    isReviewed: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {});
  Assignment.associate = function (models) {
    Assignment.belongsTo(models.Homework, {
      foreignKey: "homeworkId"
    })
    Assignment.belongsTo(models.Student, {
      foreignKey: "studentId"
    })
    Assignment.belongsTo(models.Enrolled, {
      foreignKey: "enrolledId"
    })
  };
  return Assignment;
};