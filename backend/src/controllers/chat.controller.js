const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

// Create or get existing conversation
exports.getOrCreateConversation = async (req, res) => {
  try {
    const myId = req.user.id;
    const { userId } = req.body;

    let conversation = await Conversation.findOne({
      members: { $all: [myId, userId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [myId, userId]
      });
    }

    res.status(200).json({ conversationId: conversation._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch messages
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .populate("sender", "username")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
