const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");

const {
  getOrCreateConversation,
  getMessages
} = require("../controllers/chat.controller");

router.post("/conversation", verifyToken, getOrCreateConversation);
router.get("/messages/:conversationId", verifyToken, getMessages);

module.exports = router;
