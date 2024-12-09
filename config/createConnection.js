const mysql = require('mysql2/promise');

const createConnection = async (config) => {
  return await mysql.createConnection(config);
};

module.exports = { createConnection };
