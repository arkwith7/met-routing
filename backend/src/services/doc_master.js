const db = require('../db/models');
const Doc_masterDBApi = require('../db/api/doc_master');

module.exports = class Doc_masterService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Doc_masterDBApi.create(
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
      let doc_master = await Doc_masterDBApi.findBy(
        {id},
        {transaction},
      );

      if (!doc_master) {
        throw new ValidationError(
          'doc_masterNotFound',
        );
      }

      await Doc_masterDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return doc_master;

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

      await Doc_masterDBApi.remove(
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

