
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Operation_cdDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const operation_cd = await db.operation_cd.create(
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

    code_name_alias: data.code_name_alias
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return operation_cd;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const operation_cd = await db.operation_cd.findByPk(id, {
      transaction,
    });

    await operation_cd.update(
      {

        code: data.code
        ||
        null
,

        code_name: data.code_name
        ||
        null
,

        code_name_alias: data.code_name_alias
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return operation_cd;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const operation_cd = await db.operation_cd.findByPk(id, options);

    await operation_cd.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await operation_cd.destroy({
      transaction
    });

    return operation_cd;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const operation_cd = await db.operation_cd.findOne(
      { where },
      { transaction },
    );

    if (!operation_cd) {
      return operation_cd;
    }

    const output = operation_cd.get({plain: true});

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
            'operation_cd',
            'code',
            filter.code,
          ),
        };
      }

      if (filter.code_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'operation_cd',
            'code_name',
            filter.code_name,
          ),
        };
      }

      if (filter.code_name_alias) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'operation_cd',
            'code_name_alias',
            filter.code_name_alias,
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

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.operation_cd.count({
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
    )} : await db.operation_cd.findAndCountAll(
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
            'operation_cd',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.operation_cd.findAll({
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

