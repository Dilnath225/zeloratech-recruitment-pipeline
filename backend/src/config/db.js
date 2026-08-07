const { Pool} =  require('pg');

//add the postgresql db connection pool configuration

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recruitment_db',
    password: 'secret',
    port: 5432,
});

//initiallizing  candidates table with schema anddefault values

const initDB =  async() => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS candidates (
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        application_stage VARCHAR(50) DEFAULT 'Applying Period',
        application_date DATE DEFAULT CURRENT_DATE,
        overall_score INT DEFAULT 0,
        referral_status VARCHAR(10) DEFAULT 'No',
        assessment_status VARCHAR(20) DEFAULT 'Pending'

);
    `;

    try {
        await pool.query(createTableQuery);
        console.log("Database table checked/created succesfully.");

    } catch (err) {
        console.error("Error creating candidates table:", err);
    }
}


initDB();

module.exports = {
    query: (text, params) => pool.query(text, params)
};