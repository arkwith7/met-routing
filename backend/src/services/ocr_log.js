const db = require('../db/models');
const Ocr_logDBApi = require('../db/api/ocr_log');

module.exports = class Ocr_logService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Ocr_logDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let ocr_log = await Ocr_logDBApi.findBy(
        {id},
        {transaction},
      );

      if (!ocr_log) {
        throw new ValidationError(
          'ocr_logNotFound',
        );
      }

      await Ocr_logDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return ocr_log;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await Ocr_logDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

