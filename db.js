const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: "quiz_pat_project_db",
})

module.exports = pool