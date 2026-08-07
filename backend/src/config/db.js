const { pool} =  require('pg');

const pol = new pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recruitment_db',
    password: 'secrest',
    port: 5432,
});

