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

  loginUser: async (authHeader) => {
    const loadingUsers = await userStore.all();
    // console.log(authHeader);

    for (let i = 0; i < loadingUsers.length; i++) {
      const username = loadingUsers[i].username;
      const password = loadingUsers[i].password;
      const email = loadingUsers[i].email;
      const user = { username, password, email };
      console.log('reached the user!');
      const access = jwt.verify({ user }, 'mySecretKey');
      // console.log(access);
      if (authHeader !== access) {
        console.log('stuck!');
        throw new Error();
      }
      if (authHeader === access) {
        console.log(`welcome`);
      }
    }
    // console.log(loadingUsers);
    // jwt.verify()

    /*
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
  },
  logoutUser: async (authHeader) => {
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
  },
};

module.exports = userManager;
