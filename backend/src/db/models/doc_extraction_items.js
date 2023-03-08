const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const doc_extraction_items = sequelize.define(
    'doc_extraction_items',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
item_no: {
        type: DataTypes.INTEGER,

      },

item_label: {
        type: DataTypes.TEXT,

      },

item_value: {
        type: DataTypes.TEXT,

      },

item_type: {
        type: DataTypes.TEXT,

      },

item_len: {
        type: DataTypes.TEXT,

      },

befor_desc: {
        type: DataTypes.TEXT,

      },

after_desc: {
        type: DataTypes.TEXT,

      },

    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  doc_extraction_items.associate = (db) => {

    db.doc_extraction_items.belongsTo(db.doc_master, {
      as: 'doc_name',
      foreignKey: {
        name: 'doc_nameId',
      },
      constraints: false,
    });

    db.doc_extraction_items.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.doc_extraction_items.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return doc_extraction_items;
};

