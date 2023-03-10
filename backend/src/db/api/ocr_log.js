
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Ocr_logDBApi {

  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const ocr_log = await db.ocr_log.create(
      {
        id: data.id || undefined,

        ocr_time: data.ocr_time
          ||
          null
        ,

        registration_no: data.registration_no
          ||
          null
        ,

        doc_name: data.doc_name
          ||
          null
        ,

        is_success: data.is_success
          ||
          false

        ,

        is_classification: data.is_classification
          ||
          null
        ,

        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return ocr_log;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const ocr_log = await db.ocr_log.findByPk(id, {
      transaction,
    });

    await ocr_log.update(
      {

        ocr_time: data.ocr_time
          ||
          null
        ,

        registration_no: data.registration_no
          ||
          null
        ,

        doc_name: data.doc_name
          ||
          null
        ,

        is_success: data.is_success
          ||
          false

        ,

        is_classification: data.is_classification
          ||
          null
        ,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    return ocr_log;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const ocr_log = await db.ocr_log.findByPk(id, options);

    await ocr_log.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await ocr_log.destroy({
      transaction
    });

    return ocr_log;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const ocr_log = await db.ocr_log.findOne(
      { where },
      { transaction },
    );

    if (!ocr_log) {
      return ocr_log;
    }

    const output = ocr_log.get({ plain: true });

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

      if (filter.registration_no) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'ocr_log',
            'registration_no',
            filter.registration_no,
          ),
        };
      }

      if (filter.doc_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'ocr_log',
            'doc_name',
            filter.doc_name,
          ),
        };
      }

      if (filter.is_classification) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'ocr_log',
            'is_classification',
            filter.is_classification,
          ),
        };
      }

      if (filter.ocr_timeRange) {
        const [start, end] = filter.ocr_timeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ocr_time: {
              ...where.ocr_time,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ocr_time: {
              ...where.ocr_time,
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

      if (filter.is_success) {
        where = {
          ...where,
          is_success: filter.is_success,
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

    let { rows, count } = options?.countOnly ? {
      rows: [], count: await db.ocr_log.count({
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
      )
    } : await db.ocr_log.findAndCountAll(
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
            'ocr_log',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.ocr_log.findAll({
      attributes: ['id', 'id'],
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

