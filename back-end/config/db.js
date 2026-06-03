const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hrms',
    waitForConnections: true,
    connectionLimit: 10
});
