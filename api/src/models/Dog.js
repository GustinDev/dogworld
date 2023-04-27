const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'dog',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      minimun_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      maximun_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      minimun_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maximun_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      lifespan: {
        type: DataTypes.INTEGER,
      },
      //Ponemos una imagen default, si no hay foto.
      image: {
        type: DataTypes.STRING,
        defaultValue:
          'https://static.vecteezy.com/system/resources/previews/001/200/028/original/dog-png.png',
      },
      //Temperament viene de la relación.
      db: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
