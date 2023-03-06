module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.createTable('doc_master', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('doc_extraction_items', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('disease_cd', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('operation_cd', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('insurance_cd', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('ocr_log', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'doc_master',
                      'doc_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_master',
                      'doc_class_cd',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_master',
                      'doc_subclass_cd',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_master',
                      'doc_class_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_master',
                      'doc_subclass_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_master',
                      'is_extract',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_master',
                      'doc_name_alias',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_master',
                      'doc_keyword',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'doc_nameId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'doc_master',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'item_no',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'item_label',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'item_value',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'item_type',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'item_len',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'befor_desc',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'doc_extraction_items',
                      'after_desc',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'disease_cd',
                      'code',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'disease_cd',
                      'code_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'disease_cd',
                      'code_name_alias',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'disease_cd',
                      'body_part',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'disease_cd',
                      'left_or_right',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'operation_cd',
                      'code',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'operation_cd',
                      'code_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'operation_cd',
                      'code_name_alias',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'insurance_cd',
                      'code',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'insurance_cd',
                      'code_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'insurance_cd',
                      'is_db',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'insurance_cd',
                      'is_operation',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'ocr_log',
                      'ocr_time',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'ocr_log',
                      'registration_no',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'ocr_log',
                      'doc_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'ocr_log',
                      'is_success',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'ocr_log',
                      'is_classification',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'ocr_log',
                        'is_classification',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'ocr_log',
                        'is_success',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'ocr_log',
                        'doc_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'ocr_log',
                        'registration_no',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'ocr_log',
                        'ocr_time',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'insurance_cd',
                        'is_operation',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'insurance_cd',
                        'is_db',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'insurance_cd',
                        'code_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'insurance_cd',
                        'code',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'operation_cd',
                        'code_name_alias',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'operation_cd',
                        'code_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'operation_cd',
                        'code',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'disease_cd',
                        'left_or_right',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'disease_cd',
                        'body_part',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'disease_cd',
                        'code_name_alias',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'disease_cd',
                        'code_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'disease_cd',
                        'code',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'after_desc',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'befor_desc',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'item_len',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'item_type',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'item_value',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'item_label',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'item_no',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_extraction_items',
                        'doc_nameId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'doc_keyword',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'doc_name_alias',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'is_extract',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'doc_subclass_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'doc_class_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'doc_subclass_cd',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'doc_class_cd',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'doc_master',
                        'doc_name',
                        { transaction }
                    );

                    await queryInterface.dropTable('ocr_log', { transaction });

                    await queryInterface.dropTable('insurance_cd', { transaction });

                    await queryInterface.dropTable('operation_cd', { transaction });

                    await queryInterface.dropTable('disease_cd', { transaction });

                    await queryInterface.dropTable('doc_extraction_items', { transaction });

                    await queryInterface.dropTable('doc_master', { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
