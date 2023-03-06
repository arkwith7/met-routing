const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const doc_masterRoutes = require('./routes/doc_master');

const doc_extraction_itemsRoutes = require('./routes/doc_extraction_items');

const disease_cdRoutes = require('./routes/disease_cd');

const operation_cdRoutes = require('./routes/operation_cd');

const insurance_cdRoutes = require('./routes/insurance_cd');

const ocr_logRoutes = require('./routes/ocr_log');

const options = {
  definition: {
    openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "AIDocs-Admin",
        description: "AIDocs-Admin Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.",
      },
    servers: [
      {
        url: config.swaggerUrl,
        description: "Development server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', function (req, res, next) {
    swaggerUI.host = req.get('host');
    next()
  }, swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors({origin: true}));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);

app.use('/api/doc_master', passport.authenticate('jwt', {session: false}), doc_masterRoutes);

app.use('/api/doc_extraction_items', passport.authenticate('jwt', {session: false}), doc_extraction_itemsRoutes);

app.use('/api/disease_cd', passport.authenticate('jwt', {session: false}), disease_cdRoutes);

app.use('/api/operation_cd', passport.authenticate('jwt', {session: false}), operation_cdRoutes);

app.use('/api/insurance_cd', passport.authenticate('jwt', {session: false}), insurance_cdRoutes);

app.use('/api/ocr_log', passport.authenticate('jwt', {session: false}), ocr_logRoutes);

const publicDir = path.join(
  __dirname,
  '../public',
);

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(publicDir, 'index.html'),
    );
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
