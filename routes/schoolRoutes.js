const express = require('express');
const { addSchool, listSchools } = require('../controllers/schoolController');
const { validateSchoolInput, validateListSchools } = require('../middleware/validation');

const router = express.Router();

router.post('/addSchool', validateSchoolInput, addSchool);

router.get('/listSchools', validateListSchools, listSchools);

router.get('/', (req, res) => {
  res.send('Welcome to the School Management API');
});

module.exports = router;
