const { sendMessage, getMessages } = require('../services/messageService');

const handleSendMessage = async (req, res) => {
  try {
    const { messageContent, userId, timestamp } = req.body;
    const { lobbyCode } = req.params;
    
    await sendMessage(messageContent, userId, timestamp, lobbyCode);
    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const handleGetMessage = async (req, res) => {
  const { lobbyCode } = req.params;

  try {

    const messages = await getMessages(lobbyCode);
    res.status(200).json({
      success: true,
      message: 'Messages retrieved!',
      data: messages,  // Send the sorted messages in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving message',
      error: error.message,
    });
  }
};

module.exports = { handleSendMessage, handleGetMessage };
