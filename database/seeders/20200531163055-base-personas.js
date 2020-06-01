'use strict';
var personas = require('../../fixtures/people.json').map((person)=>{
  // person.fields["id"]=person.pk
  const picked = (({ name,
    gender,
    skin_color,
    hair_color,
    eye_color,createdAt,updatedAt }) => ({ name,
      gender,
      skin_color,
      hair_color,
      eye_color,
      createdAt:new Date(),
      updatedAt: new Date()}))(person.fields);
  return picked;
});
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Personas', personas);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Personas', null, {});
  }
};
