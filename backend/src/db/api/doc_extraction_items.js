
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Doc_extraction_itemsDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const doc_extraction_items = await db.doc_extraction_items.create(
  {
  id: data.id || undefined,

    item_no: data.item_no
    ||
    null
,

    item_label: data.item_label
    ||
    null
,

    item_value: data.item_value
    ||
    null
,

    item_type: data.item_type
    ||
    null
,

    item_len: data.item_len
    ||
    null
,

    befor_desc: data.befor_desc
    ||
    null
,

    after_desc: data.after_desc
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await doc_extraction_items.setDoc_name(data.doc_name || null, {
    transaction,
    });

  return doc_extraction_items;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const doc_extraction_items = await db.doc_extraction_items.findByPk(id, {
      transaction,
    });

    await doc_extraction_items.update(
      {

        item_no: data.item_no
        ||
        null
,

        item_label: data.item_label
        ||
        null
,

        item_value: data.item_value
        ||
        null
,

        item_type: data.item_type
        ||
        null
,

        item_len: data.item_len
        ||
        null
,

        befor_desc: data.befor_desc
        ||
        null
,

        after_desc: data.after_desc
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await doc_extraction_items.setDoc_name(data.doc_name || null, {
      transaction,
    });

    return doc_extraction_items;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const doc_extraction_items = await db.doc_extraction_items.findByPk(id, options);

    await doc_extraction_items.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await doc_extraction_items.destroy({
      transaction
    });

    return doc_extraction_items;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const doc_extraction_items = await db.doc_extraction_items.findOne(
      { where },
      { transaction },
    );

    if (!doc_extraction_items) {
      return doc_extraction_items;
    }

    const output = doc_extraction_items.get({plain: true});

    output.doc_name = await doc_extraction_items.getDoc_name({
      transaction
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [

      {
        model: db.doc_master,
        as: 'doc_name',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.item_label) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_extraction_items',
            'item_label',
            filter.item_label,
          ),
        };
      }

      if (filter.item_value) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_extraction_items',
            'item_value',
            filter.item_value,
          ),
        };
      }

      if (filter.item_type) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_extraction_items',
            'item_type',
            filter.item_type,
          ),
        };
      }

      if (filter.item_len) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_extraction_items',
            'item_len',
            filter.item_len,
          ),
        };
      }

      if (filter.befor_desc) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_extraction_items',
            'befor_desc',
            filter.befor_desc,
          ),
        };
      }

      if (filter.after_desc) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_extraction_items',
            'after_desc',
            filter.after_desc,
          ),
        };
      }

      if (filter.item_noRange) {
        const [start, end] = filter.item_noRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            item_no: {
              ...where.item_no,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            item_no: {
              ...where.item_no,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active:
            filter.active === true ||
            filter.active === 'true',
        };
      }

      if (filter.doc_name) {
        var listItems = filter.doc_name.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          doc_nameId: {[Op.or]: listItems}
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.doc_extraction_items.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order: (filter.field && filter.sort)
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
        },
    )} : await db.doc_extraction_items.findAndCountAll(
        {
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order: (filter.field && filter.sort)
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
        },
    );

//    rows = await this._fillWithRelationsAndFilesForRows(
//      rows,
//      options,
//    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'doc_extraction_items',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.doc_extraction_items.findAll({
      attributes: [ 'id', 'id' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

};

