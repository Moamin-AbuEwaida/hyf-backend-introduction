const express = require('express');
const channelController = require('../controllers/channels');
const channelManager = require('../business-logic/channels');

const channelRoutes = express.Router();
/*
channelRoutes.use((req, res, next) => {
  console.log('api!');
  next();
});
*/
/*
channelRoutes.use('./:channelId', async (req, res, next) => {
  try {
    const channel = await channelManager.getChannel(req.params.channelId);
    req.channel = channel;
    next();
  } catch (error) {
    res.status(400).send({
      message:
        "channelId provided couldn't be found, please use correct Id of undeleted channels!",
    });
  }
});
*/

channelRoutes.get('/', channelController.get);
channelRoutes.get('/:channelId', channelController.getChannelById);
channelRoutes.delete('/:channelId', channelController.delete);
channelRoutes.put('/:channelId', channelController.put);
channelRoutes.post('/', channelController.post);

module.exports = channelRoutes;
