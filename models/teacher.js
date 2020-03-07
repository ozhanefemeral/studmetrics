'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40]
      }
    }
  }, {});
  Teacher.associate = function (models) {
    Teacher.belongsTo(models.School, {
      foreignKey: 'schoolId'
    })
    Teacher.hasMany(models.Offer, {
      foreignKey: 'teacherId'
    })
  };
  return Teacher;
};