'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    mark: DataTypes.INTEGER,
    answers: DataTypes.ARRAY(DataTypes.JSON)
  }, {});
  Assignment.associate = function (models) {
    Assignment.belongsTo(models.Homework, {
      foreignKey: 'homeworkId'
    })
    Assignment.belongsTo(models.Student, {
      foreignKey: 'studentId'
    })
  };
  return Assignment;
};