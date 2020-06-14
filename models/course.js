'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      },
    },
    average: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {});
  Course.associate = function (models) {
    Course.belongsTo(models.School, {
      foreignKey: "schoolId"
    })
    Course.hasMany(models.Offer, {
      foreignKey: "courseId"
    })
  };
  return Course;
};