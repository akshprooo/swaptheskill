const { getSkillPreset, getRecommendations } = require('../controllers/utils.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const express = require('express');
const router = express.Router();

router.get('/skills', getSkillPreset);
router.get('/recommendations', verifyToken, getRecommendations);

module.exports = router;