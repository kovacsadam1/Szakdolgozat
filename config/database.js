const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'hazikedvenc',
    connectionLimit: 10,
})

module.exports = pool