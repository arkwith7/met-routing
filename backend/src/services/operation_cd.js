const db = require('../db/models');
const Operation_cdDBApi = require('../db/api/operation_cd');

module.exports = class Operation_cdService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Operation_cdDBApi.create(
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
      let operation_cd = await Operation_cdDBApi.findBy(
        {id},
        {transaction},
      );

      if (!operation_cd) {
        throw new ValidationError(
          'operation_cdNotFound',
        );
      }

      await Operation_cdDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return operation_cd;

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

      await Operation_cdDBApi.remove(
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

