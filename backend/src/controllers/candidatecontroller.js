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

//add a new candidate to the database
exports.addCandidate = async (req, res) => {
    try {
    const { name, application_stage, application_date, overall_score, referral_status, assessment_status } = req.body;

    const query = `
        INSERT INTO candidates (name, application_stage, application_date, overall_score, referral_status, assessment_status)
        VALUES ($1, $2, COALESCE($3, CURRENT_DATE), $4, $5, $6)
        RETURNING *;
    `;
    
    const values = [
        name,
        application_stage || 'Applying Period',
        application_date || null,
        overall_score || 0,
        referral_status || 'No',
        assessment_status || 'Pending'  
    ];

    const newCandidate = await db.query(query, values);
    res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate.rows[0] });
}catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });

}
};

//PUT : update the details of new candidate in the database
exports.updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, application_stage, overall_score, referral_status, assessment_status } = req.body;

        const query = `

            UPDATE candidates
            SET name = COALESCE($1, name),
                application_stage = COALESCE($2, application_stage),
                overall_score = COALESCE($3, overall_score),
                referral_status = COALESCE($4, referral_status),
                assessment_status = COALESCE($5, assessment_status)
            WHERE id = $6
            RETURNING *;
        `;
        const values = [
            name,
            application_stage,
            overall_score,
            referral_status,
            assessment_status,
            id
        ];
        const updateValues = [name, application_stage, overall_score, referral_status, assessment_status, id];
        const updated = await db.query(query, values);
        if (updated.rows.length === 0) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json({ message: 'Candidate updated successfully', candidate: updated.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

//to delete a candidate from the database
exports.deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await db.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
        if (deleted.rows.length === 0) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json({ message: 'Candidate deleted successfully', candidate: deleted.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};  