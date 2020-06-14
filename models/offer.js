'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    semester: DataTypes.STRING,
    code: {
      type: DataTypes.STRING,
      required: true
    },
    average: { type: DataTypes.DECIMAL(10, 2) },
    homeworkAverage: { type: DataTypes.DECIMAL(10, 2) },
    files: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      default: ""
    }
  }, {
    hooks: {
      afterSave: async (offer, options) => {
        // const teacher = await offer.getTeacher()
        // const offers = await teacher.getOffers({ attributes: ['average'] })

        // let sum = 0;

        // offers.forEach(element => {

        //   sum += element.average;
        // })

        // teacher.average = sum / offers.length;
        // teacher.save()
      }
    }
  });
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