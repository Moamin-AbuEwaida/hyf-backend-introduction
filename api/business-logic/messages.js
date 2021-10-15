const objectId = require('objectid');

const persistentDataAccess = require('../data-access/persistent');

const messageStore = persistentDataAccess('messages');

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {
    // TODO: implement
    const id = objectId().toString();
    const message = {
      text: messageContent,
      id: id,
      user: user,
      channelId: channelId,
      date: new Date(),
    };
    await messageStore.create(message);
    return message;
  },
  updateMessage: async (message) => {
    // TODO: implement
    const newMessage = await messageStore.update(message.id, message);
    if (!success) {
      throw new Error('Cannot update message');
    }
    return newMessage;
  },
  removeMessage: async (messageId) => {
    // TODO: implement
    await messageStore.remove(messageId);
    return true;
  },
  getMessage: async (messageId) => {
    // TODO: implement
    const message = await messageStore.read(messageId);

    if (!message) {
      throw new Error(`couldn't find the message!`);
    }

    return message;
  },
  getAllMessages: async () => {
    // TODO: implement
    return await messageStore.all();
  },
  getMessagesForChannel: async (channelId) => {
    // TODO: implement
    const res = [];
    const allMessages = await messageStore.all(channelId);
    for (let i = 0; i < allMessages.length; i++) {
      const theMessage = allMessages[i];
      if (theMessage.channelId === channelId) {
        res.push(theMessage);
      }
    }
    return res;
  },
};

module.exports = messageManager;
