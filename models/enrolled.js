'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enrolled = sequelize.define('Enrolled', {
    result: DataTypes.FLOAT,
    marks: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }
  }, {});
  Enrolled.associate = function (models) {
    Enrolled.belongsTo(models.Student, {
      foreignKey: "studentId"
    })
    Enrolled.belongsTo(models.Offer, {
      foreignKey: "offerId"
    })
    Enrolled.hasMany(models.Assignment, {
      foreignKey: "enrolledId"
    })
  };
  return Enrolled;
};