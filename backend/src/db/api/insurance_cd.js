
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Insurance_cdDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const insurance_cd = await db.insurance_cd.create(
  {
  id: data.id || undefined,

    code: data.code
    ||
    null
,

    code_name: data.code_name
    ||
    null
,

    is_db: data.is_db
    ||
    false

,

    is_operation: data.is_operation
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return insurance_cd;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const insurance_cd = await db.insurance_cd.findByPk(id, {
      transaction,
    });

    await insurance_cd.update(
      {

        code: data.code
        ||
        null
,

        code_name: data.code_name
        ||
        null
,

        is_db: data.is_db
        ||
        false

,

        is_operation: data.is_operation
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return insurance_cd;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const insurance_cd = await db.insurance_cd.findByPk(id, options);

    await insurance_cd.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await insurance_cd.destroy({
      transaction
    });

    return insurance_cd;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const insurance_cd = await db.insurance_cd.findOne(
      { where },
      { transaction },
    );

    if (!insurance_cd) {
      return insurance_cd;
    }

    const output = insurance_cd.get({plain: true});

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

      if (filter.code) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'insurance_cd',
            'code',
            filter.code,
          ),
        };
      }

      if (filter.code_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'insurance_cd',
            'code_name',
            filter.code_name,
          ),
        };
      }

      if (filter.is_operation) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'insurance_cd',
            'is_operation',
            filter.is_operation,
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

      if (filter.is_db) {
        where = {
          ...where,
          is_db: filter.is_db,
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

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.insurance_cd.count({
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
    )} : await db.insurance_cd.findAndCountAll(
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
            'insurance_cd',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.insurance_cd.findAll({
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

