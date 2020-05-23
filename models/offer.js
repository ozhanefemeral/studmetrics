'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    semester: DataTypes.STRING,
    code: {
      type: DataTypes.STRING,
      required: true
    },
    files: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      default: ""
    }
  }, {});
  Offer.associate = function (models) {
    Offer.hasMany(models.Enrolled, {
      foreignKey: "offerId"
    })
    Offer.hasMany(models.Homework, {
      foreignKey: "offerId"
    })
    Offer.belongsTo(models.Course, {
      foreignKey: "courseId"
    })
    Offer.belongsTo(models.Teacher, {
      foreignKey: "teacherId"
    })
  };
  return Offer;
};