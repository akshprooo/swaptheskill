const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
      if (!text || text.length > 500) return;

      const message = await Message.create({
        conversationId,
        sender: senderId,
        text
      });

      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: text
      });

      io.to(conversationId).emit("receiveMessage", {
        conversationId,
        senderId,
        text,
        createdAt: message.createdAt
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
