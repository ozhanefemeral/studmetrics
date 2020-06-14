'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enrolled = sequelize.define('Enrolled', {
    result: { type: DataTypes.DECIMAL(10, 2) },
    marks: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }
  }, {
    hooks: {
      afterSave: async (enrolled, options) => {
        enrolled.getOffer().then(async offer => {
          return { offer, enrolleds: await offer.getEnrolleds({ attributes: ['result'] }) }
        }).then(({ offer, enrolleds }) => {
          let sum = 0;
          enrolleds.forEach(element => {
            sum += parseFloat(element.result)

          });
          const average = sum / enrolleds.length;
          if (average == NaN) {
            average = 0;
          }

          offer.average = average;
          offer.save()
        });

        // enrolled.getStudent().then(async student => {
        //   return { student, enrolleds: await student.getEnrolleds({ attributes: ['result'] }) }
        // }).then(({ student, enrolleds }) => {
        //   let sum = 0;

        //   enrolleds.forEach(element => {
        //     sum += element.result
        //   });

        //   const average = sum / enrolleds.length;
        //   if (average == NaN) {
        //     average = 0;
        //   }
        //   student.average = average;
        //   student.save()
        // })
      }
    }
  });
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