
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Doc_masterDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const doc_master = await db.doc_master.create(
  {
  id: data.id || undefined,

    doc_name: data.doc_name
    ||
    null
,

    doc_class_cd: data.doc_class_cd
    ||
    null
,

    doc_subclass_cd: data.doc_subclass_cd
    ||
    null
,

    doc_class_name: data.doc_class_name
    ||
    null
,

    doc_subclass_name: data.doc_subclass_name
    ||
    null
,

    is_extract: data.is_extract
    ||
    false

,

    doc_name_alias: data.doc_name_alias
    ||
    null
,

    doc_keyword: data.doc_keyword
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return doc_master;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const doc_master = await db.doc_master.findByPk(id, {
      transaction,
    });

    await doc_master.update(
      {

        doc_name: data.doc_name
        ||
        null
,

        doc_class_cd: data.doc_class_cd
        ||
        null
,

        doc_subclass_cd: data.doc_subclass_cd
        ||
        null
,

        doc_class_name: data.doc_class_name
        ||
        null
,

        doc_subclass_name: data.doc_subclass_name
        ||
        null
,

        is_extract: data.is_extract
        ||
        false

,

        doc_name_alias: data.doc_name_alias
        ||
        null
,

        doc_keyword: data.doc_keyword
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return doc_master;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const doc_master = await db.doc_master.findByPk(id, options);

    await doc_master.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await doc_master.destroy({
      transaction
    });

    return doc_master;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const doc_master = await db.doc_master.findOne(
      { where },
      { transaction },
    );

    if (!doc_master) {
      return doc_master;
    }

    const output = doc_master.get({plain: true});

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

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.doc_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_master',
            'doc_name',
            filter.doc_name,
          ),
        };
      }

      if (filter.doc_class_cd) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_master',
            'doc_class_cd',
            filter.doc_class_cd,
          ),
        };
      }

      if (filter.doc_subclass_cd) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_master',
            'doc_subclass_cd',
            filter.doc_subclass_cd,
          ),
        };
      }

      if (filter.doc_class_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_master',
            'doc_class_name',
            filter.doc_class_name,
          ),
        };
      }

      if (filter.doc_subclass_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_master',
            'doc_subclass_name',
            filter.doc_subclass_name,
          ),
        };
      }

      if (filter.doc_name_alias) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_master',
            'doc_name_alias',
            filter.doc_name_alias,
          ),
        };
      }

      if (filter.doc_keyword) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'doc_master',
            'doc_keyword',
            filter.doc_keyword,
          ),
        };
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

      if (filter.is_extract) {
        where = {
          ...where,
          is_extract: filter.is_extract,
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

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.doc_master.count({
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
    )} : await db.doc_master.findAndCountAll(
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
            'doc_master',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.doc_master.findAll({
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

