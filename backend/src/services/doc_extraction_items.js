const db = require('../db/models');
const Doc_extraction_itemsDBApi = require('../db/api/doc_extraction_items');

module.exports = class Doc_extraction_itemsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Doc_extraction_itemsDBApi.create(
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
      let doc_extraction_items = await Doc_extraction_itemsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!doc_extraction_items) {
        throw new ValidationError(
          'doc_extraction_itemsNotFound',
        );
      }

      await Doc_extraction_itemsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return doc_extraction_items;

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

      await Doc_extraction_itemsDBApi.remove(
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

