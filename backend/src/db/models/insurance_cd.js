const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const insurance_cd = sequelize.define(
    'insurance_cd',
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

      is_db: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

      is_operation: {
        type: DataTypes.TEXT,

      },

    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  insurance_cd.associate = (db) => {

    db.insurance_cd.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.insurance_cd.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return insurance_cd;
};

