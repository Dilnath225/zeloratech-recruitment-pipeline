const { pool} =  require('pg');

//add the postgresql db connection pool configuration

const pol = new pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recruitment_db',
    password: 'secrest',
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
        referral_status VARCHAR 10 DEFAULT 'No',
        assessment_status VARCHAR 20 DEFAULT 'Pending',

);
    `;

    try {
        await pool.query(createTableQuery);
        console.log("Database table checked/created succesfully.");

    } catch (err) {
        console.error("Error creating candidates table:", err);
    }
}