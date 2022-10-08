const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hardness:{
        type: DataTypes.FLOAT
    },
    duration:{
        type: DataTypes.INTEGER 
    },
    season :{
        type: DataTypes.ARRAY(DataTypes.ENUM('summer', 'autumn', 'winter' ,'spring'))
    }
  },{
      timestamps:false
  });
};