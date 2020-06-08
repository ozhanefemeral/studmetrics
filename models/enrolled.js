'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enrolled = sequelize.define('Enrolled', {
    result: { type: DataTypes.FLOAT, decimals: 3 },
    marks: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] }
  }, {
    hooks: {
      afterSave: async (enrolled, options) => {
        const offer = await enrolled.getOffer()
        const results = await offer.getEnrolleds({ attributes: ['result'] })

        let sum = 0;


        results.forEach(element => {
          sum += element.result;
        })

        offer.average = sum / results.length;
        offer.save()
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