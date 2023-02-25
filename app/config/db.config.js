module.exports = {
  HOST: "localhost",
  USER: "sa",
  PASSWORD: "infinov1*",
  DB: "metdb",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
