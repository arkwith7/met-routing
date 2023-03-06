
const express = require('express');

const Doc_extraction_itemsService = require('../services/doc_extraction_items');
const Doc_extraction_itemsDBApi = require('../db/api/doc_extraction_items');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Doc_extraction_items:
 *        type: object
 *        properties:

 *          item_label:
 *            type: string
 *            default: item_label
 *          item_value:
 *            type: string
 *            default: item_value
 *          item_type:
 *            type: string
 *            default: item_type
 *          item_len:
 *            type: string
 *            default: item_len
 *          befor_desc:
 *            type: string
 *            default: befor_desc
 *          after_desc:
 *            type: string
 *            default: after_desc

 *          item_no:
 *            type: integer
 *            format: int64

 */

/**
 *  @swagger
 * tags:
 *   name: Doc_extraction_items
 *   description: The Doc_extraction_items managing API
 */

  /**
  *  @swagger
  *  /api/doc_extraction_items:
  *    post:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_extraction_items]
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
  *                  $ref: "#/components/schemas/Doc_extraction_items"
  *      responses:
  *        200:
  *          description: The item was successfully added
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Doc_extraction_items"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        405:
  *          description: Invalid input data
  *        500:
  *          description: Some server error
  */

router.post('/', async (req, res) => {
    await Doc_extraction_itemsService.create(req.body.data, req.currentUser, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
});

  /**
  *  @swagger
  *  /api/doc_extraction_items/{id}:
  *    put:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_extraction_items]
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
  *                  $ref: "#/components/schemas/Doc_extraction_items"
  *              required:
  *                - id
  *      responses:
  *        200:
  *          description: The item data was successfully updated
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Doc_extraction_items"
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
  await Doc_extraction_itemsService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  * @swagger
  *  /api/doc_extraction_items/{id}:
  *    delete:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_extraction_items]
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
  *                $ref: "#/components/schemas/Doc_extraction_items"
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
  await Doc_extraction_itemsService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  *  @swagger
  *  /api/doc_extraction_items:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_extraction_items]
  *      summary: Get all doc_extraction_items
  *      description: Get all doc_extraction_items
  *      responses:
  *        200:
  *          description: Doc_extraction_items list successfully received
  *          content:
  *            application/json:
  *              schema:
  *                type: array
  *                items:
  *                  $ref: "#/components/schemas/Doc_extraction_items"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Data not found
  *        500:
  *          description: Some server error
  */

router.get('/', wrapAsync(async (req, res) => {
  const filetype = req.query.filetype
  const payload = await Doc_extraction_itemsDBApi.findAll(
    req.query,
  );
  if (filetype && filetype === 'csv') {
    const fields = ['id','item_label','item_value','item_type','item_len','befor_desc','after_desc',
        'item_no',

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
 *  /api/doc_extraction_items/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Doc_extraction_items]
 *      summary: Count all doc_extraction_items
 *      description: Count all doc_extraction_items
 *      responses:
 *        200:
 *          description: Doc_extraction_items count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Doc_extraction_items"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/count', wrapAsync(async (req, res) => {
    const payload = await Doc_extraction_itemsDBApi.findAll(
        req.query,
        { countOnly: true }
    );

    res.status(200).send(payload);
}));

/**
 *  @swagger
 *  /api/doc_extraction_items/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Doc_extraction_items]
 *      summary: Find all doc_extraction_items that match search criteria
 *      description: Find all doc_extraction_items that match search criteria
 *      responses:
 *        200:
 *          description: Doc_extraction_items list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Doc_extraction_items"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await Doc_extraction_itemsDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

  /**
  * @swagger
  *  /api/doc_extraction_items/{id}:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Doc_extraction_items]
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
  *                $ref: "#/components/schemas/Doc_extraction_items"
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
  const payload = await Doc_extraction_itemsDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
