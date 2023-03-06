const db = require('../db/models');
const Insurance_cdDBApi = require('../db/api/insurance_cd');

module.exports = class Insurance_cdService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Insurance_cdDBApi.create(
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
      let insurance_cd = await Insurance_cdDBApi.findBy(
        {id},
        {transaction},
      );

      if (!insurance_cd) {
        throw new ValidationError(
          'insurance_cdNotFound',
        );
      }

      await Insurance_cdDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return insurance_cd;

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

      await Insurance_cdDBApi.remove(
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

