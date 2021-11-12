/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
const persistentDataAccess = require('../data-access/persistent');
const jwt = require('jsonwebtoken');
const userStore = persistentDataAccess('users');

const userManager = {
  registerUser: async (user) => {
    console.log(user);
    const storingUser = await userStore.create(user);
    console.log(storingUser);
    return user;
  },

  verifyToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader === 'undefined') {
      const bearer = authHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  },

  loginUser: async (authHeader) => {
    /*
    for implementing authorization with a saved token at the database!

    const loadingUsers = await userStore.all();
    
      if (authHeader.length !== 64) {
      console.log('no access granted!!');
      throw new Error();
    }

    for (let i = 0; i < loadingUsers.length; i++) {
      if (authHeader === loadingUsers[i].token) {
        console.log(`welcome ${loadingUsers[i].username}`);
      }
    }
    return loadingUsers;
    */

    jwt.verify(authHeader, 'mySecretKey', (err, pass) => {
      if (err) {
        console.log('stuck!');
        throw new Error();
      } else {
        pass;
      }
    });

    // console.log('2');
  },
  logoutUser: async (authHeader) => {
    /*
    for implementing authorization with a saved token at the database!

    const loadingUsers = await userStore.all();

    if (authHeader.length !== 64) {
      console.log('no access granted!!');
      throw new Error();
    }

    for (let i = 0; i < loadingUsers.length; i++) {
      if (authHeader === loadingUsers[i].token) {
        console.log(`bye bye ${loadingUsers[i].username}!`);
        loadingUsers[i].token = '';
      }
    }
    return loadingUsers;
    */

    jwt.verify(authHeader, 'mySecretKey', (err, pass) => {
      if (err) {
        console.log('stuck!');
        throw new Error();
      } else {
        pass;
      }
    });
  },
};

module.exports = userManager;
