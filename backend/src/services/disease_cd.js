const db = require('../db/models');
const Disease_cdDBApi = require('../db/api/disease_cd');

module.exports = class Disease_cdService {
  static async create(data, currentUser) {
    console.log("질병코드정보 전달 data",data)
    const transaction = await db.sequelize.transaction();
    try {
      await Disease_cdDBApi.create(
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
      let disease_cd = await Disease_cdDBApi.findBy(
        {id},
        {transaction},
      );

      if (!disease_cd) {
        throw new ValidationError(
          'disease_cdNotFound',
        );
      }

      await Disease_cdDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return disease_cd;

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

      await Disease_cdDBApi.remove(
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

