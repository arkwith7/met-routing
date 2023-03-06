const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const doc_master = sequelize.define(
    'doc_master',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

doc_name: {
        type: DataTypes.TEXT,

      },

doc_class_cd: {
        type: DataTypes.TEXT,

      },

doc_subclass_cd: {
        type: DataTypes.TEXT,

      },

doc_class_name: {
        type: DataTypes.TEXT,

      },

doc_subclass_name: {
        type: DataTypes.TEXT,

      },

is_extract: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

doc_name_alias: {
        type: DataTypes.TEXT,

      },

doc_keyword: {
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

  doc_master.associate = (db) => {

    db.doc_master.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.doc_master.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return doc_master;
};

