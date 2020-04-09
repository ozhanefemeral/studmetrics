'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      }
    }
  }, {});
  Student.associate = function (models) {
    Student.belongsTo(models.School, {
      foreignKey: "schoolId"
    })
    Student.hasMany(models.Assignment, {
      foreignKey: "studentId"
    })
    Student.hasMany(models.Enrolled, {
      foreignKey: "studentId"
    })
  };
  return Student;
};