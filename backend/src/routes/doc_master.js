
const express = require('express');

const Doc_masterService = require('../services/doc_master');
const Doc_masterDBApi = require('../db/api/doc_master');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Doc_master:
 *        type: object
 *        properties:

 *          doc_name:
 *            type: string
 *            default: doc_name
 *          doc_class_cd:
 *            type: string
 *            default: doc_class_cd
 *          doc_subclass_cd:
 *            type: string
 *            default: doc_subclass_cd
 *          doc_class_name:
 *            type: string
 *            default: doc_class_name
 *          doc_subclass_name:
 *            type: string
 *            default: doc_subclass_name
 *          doc_name_alias:
 *            type: string
 *            default: doc_name_alias
 *          doc_keyword:
 *            type: string
 *            default: doc_keyword

 */

/**
 *  @swagger
 * tags:
 *   name: Doc_master
 *   description: The Doc_master managing API
 */

  /**
  *  @swagger
  *  /api/doc_master:
  *    post:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_master]
  *      summary: Add new item
  *      description: Add new item
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              properties:
  *                data:
  *                  description: Data of the updated item
  *                  type: object
  *                  $ref: "#/components/schemas/Doc_master"
  *      responses:
  *        200:
  *          description: The item was successfully added
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Doc_master"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        405:
  *          description: Invalid input data
  *        500:
  *          description: Some server error
  */

router.post('/', async (req, res) => {
    await Doc_masterService.create(req.body.data, req.currentUser, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
});

  /**
  *  @swagger
  *  /api/doc_master/{id}:
  *    put:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_master]
  *      summary: Update the data of the selected item
  *      description: Update the data of the selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: Item ID to update
  *          required: true
  *          schema:
  *            type: string
  *      requestBody:
  *        description: Set new item data
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              properties:
  *                id:
  *                  description: ID of the updated item
  *                  type: string
  *                data:
  *                  description: Data of the updated item
  *                  type: object
  *                  $ref: "#/components/schemas/Doc_master"
  *              required:
  *                - id
  *      responses:
  *        200:
  *          description: The item data was successfully updated
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Doc_master"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.put('/:id', wrapAsync(async (req, res) => {
  await Doc_masterService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  * @swagger
  *  /api/doc_master/{id}:
  *    delete:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_master]
  *      summary: Delete the selected item
  *      description: Delete the selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: Item ID to delete
  *          required: true
  *          schema:
  *            type: string
  *      responses:
  *        200:
  *          description: The item was successfully deleted
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Doc_master"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.delete('/:id', wrapAsync(async (req, res) => {
  await Doc_masterService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  *  @swagger
  *  /api/doc_master:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_master]
  *      summary: Get all doc_master
  *      description: Get all doc_master
  *      responses:
  *        200:
  *          description: Doc_master list successfully received
  *          content:
  *            application/json:
  *              schema:
  *                type: array
  *                items:
  *                  $ref: "#/components/schemas/Doc_master"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Data not found
  *        500:
  *          description: Some server error
  */

router.get('/', wrapAsync(async (req, res) => {
  const filetype = req.query.filetype
  const payload = await Doc_masterDBApi.findAll(
    req.query,
  );
  if (filetype && filetype === 'csv') {
    const fields = ['id','doc_name','doc_class_cd','doc_subclass_cd','doc_class_name','doc_subclass_name','doc_name_alias','doc_keyword',

        ];
    const opts = { fields };
    try {
      const csv = parse(payload.rows, opts);
      res.status(200).attachment(csv);
      res.send(csv)

    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(200).send(payload);
  }

}));

/**
 *  @swagger
 *  /api/doc_master/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Doc_master]
 *      summary: Count all doc_master
 *      description: Count all doc_master
 *      responses:
 *        200:
 *          description: Doc_master count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Doc_master"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/count', wrapAsync(async (req, res) => {
    const payload = await Doc_masterDBApi.findAll(
        req.query,
        { countOnly: true }
    );

    res.status(200).send(payload);
}));

/**
 *  @swagger
 *  /api/doc_master/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Doc_master]
 *      summary: Find all doc_master that match search criteria
 *      description: Find all doc_master that match search criteria
 *      responses:
 *        200:
 *          description: Doc_master list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Doc_master"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await Doc_masterDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

  /**
  * @swagger
  *  /api/doc_master/{id}:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_master]
  *      summary: Get selected item
  *      description: Get selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: ID of item to get
  *          required: true
  *          schema:
  *            type: string
  *      responses:
  *        200:
  *          description: Selected item successfully received
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Doc_master"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await Doc_masterDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
