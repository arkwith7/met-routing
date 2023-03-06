const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const operation_cd = sequelize.define(
    'operation_cd',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

code: {
        type: DataTypes.TEXT,

      },

code_name: {
        type: DataTypes.TEXT,

      },

code_name_alias: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  operation_cd.associate = (db) => {

    db.operation_cd.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.operation_cd.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return operation_cd;
};

