'use strict';
module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define('Persona', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    skin_color: DataTypes.STRING,
    hair_color: DataTypes.STRING,
    eye_color: DataTypes.STRING
  }, {});
  Persona.associate = function(models) {
    // associations can be defined here
  };
  return Persona;
};