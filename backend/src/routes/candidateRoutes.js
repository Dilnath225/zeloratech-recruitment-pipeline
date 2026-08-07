const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidatecontroller');

// connected the routes to the controller functions

router.get('/candidates', candidateController.getCandidates);
router.post('/candidates', candidateController.addCandidate);
router.put('/candidates/:id', candidateController.updateCandidate);
router.delete('/candidates/:id', candidateController.deleteCandidate);

module.exports = router;

