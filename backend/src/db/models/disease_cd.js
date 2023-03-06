const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const disease_cd = sequelize.define(
    'disease_cd',
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

body_part: {
        type: DataTypes.TEXT,

      },

left_or_right: {
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

  disease_cd.associate = (db) => {

    db.disease_cd.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.disease_cd.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return disease_cd;
};

