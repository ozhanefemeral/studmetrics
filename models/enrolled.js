'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enrolled = sequelize.define('Enrolled', {
    result: DataTypes.FLOAT,
  }, {});
  Enrolled.associate = function (models) {
    Enrolled.belongsTo(models.Student, {
      foreignKey: 'studentId'
    })
    Enrolled.belongsTo(models.Offer, {
      foreignKey: 'offerId'
    })
    Enrolled.belongsTo(models.Course, {
      foreignKey: 'courseId'
    })
    Enrolled.hasMany(models.Assignment, {
      foreignKey: 'enrolledId'
    })
  };
  return Enrolled;
};