const messageManager = require('../business-logic/messages');

const messageController = {
  get: async (req, res) => {
    // returns all messages currently in the system
    // TODO implement
    try {
      const messages = await messageManager.getAllMessages();
      // console.log(messages);
      res.status(200).send(JSON.stringify(messages));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getMessagesForChannel: async (req, res) => {
    // returns the messages that belong in the channel with the specified id
    // passed as /api/channels/:channelId/messages
    // TODO implement
    try {
      const channelId = req.params.channelId;
      // console.log(channelId);
      const message = await messageManager.getMessagesForChannel(channelId);
      // console.log(message);
      res.status(200).send(JSON.stringify(message));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  put: async (req, res) => {
    // updates the messages with the specified id
    // passed as /api/messages/:messageId
    // TODO implement
    //res.send('Not yet implemented');
    try {
      const messageId = req.params.messageId;
      // console.log(messageId);
      const newMessage = req.body;
      if (newMessage.id !== messageId) {
        throw Error('cannot edit a un existed message!');
      }
      res.status(200).send(JSON.stringify(newMessage));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  post: async (req, res) => {
    // creates a new message based on the passed body
    // TODO implement
    //res.send('Not yet implemented');
    try {
      const user = req.body.user;
      const content = req.body.text;
      const channelId = req.params.channelId;
      const message = await messageManager.createMessage(
        user,
        content,
        channelId,
      );
      res.status(200).send(JSON.stringify(message));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    // deleted the message with the specified id
    // passed as /api/messages/:messageId
    // TODO implement
    try {
      const messageId = req.params.messageId;
      await messageManager.removeMessage(messageId);
      res.status(200).send({ message: `message id ${messagId} was deleted!` });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = messageController;
