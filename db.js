require('dotenv').config();
const mysql = require('mysql');

const config = process.env.NODE_ENV === 'test'
  ? {
    host: process.env.DB_HOST_TEST || 'localhost',
    port: process.env.DB_PORT_TEST || '3308',
    user: process.env.DB_USER_TEST || 'root',
    password: process.env.DB_PASS_TEST || 'root',
    database: process.env.DB_NAME_TEST || 'sample_db_test',
    connectionLimit: 10,
  } : {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'sample_db',
    connectionLimit: 10,
  };

const pool = mysql.createPool(config);

module.exports = pool;
