module.exports = {
  HOST: "localhost",
  PORT: "1436",
  USER: "sa",
  PASSWORD: "infinov*1",
  DB: "aiocr_db",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
