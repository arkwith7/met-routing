const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const ocr_log = sequelize.define(
    'ocr_log',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
ocr_time: {
        type: DataTypes.DATE,

      },

registration_no: {
        type: DataTypes.TEXT,

      },

doc_name: {
        type: DataTypes.TEXT,

      },

is_success: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

is_classification: {
        type: DataTypes.TEXT,

      },


    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  ocr_log.associate = (db) => {

    db.ocr_log.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.ocr_log.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return ocr_log;
};

