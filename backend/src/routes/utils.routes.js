const { getSkillPreset } = require('../controllers/utils.controller');

const express = require('express');
const router = express.Router();

router.get('/skills', getSkillPreset);

module.exports = router;