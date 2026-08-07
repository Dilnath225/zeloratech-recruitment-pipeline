const db = require('../config/db');

// Function to get all candidates

exports.getCandidates = async (req, res) => {
    try {
        const{stage} = req.query;
        let query = 'SELECT * FROM candidates ORDER BY id ASC';
        let params = [];
        
        if (stage){
            query = 'SELECT * FROM candidates WHERE LOWER(application_stage) = LOWER($1) ORDER BY id ASC';
            params = [stage];
        }
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};