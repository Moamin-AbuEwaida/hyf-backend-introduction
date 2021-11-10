/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */

const userManager = require('../business-logic/users');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userController = {
  get: async (req, res) => {
    try {
      const users = await userManager.getAllusers();
      res.status(200).send(JSON.stringify(users));
    } catch (error) {
      res.status(500).send({ ok: false, message: `didn't work` });
    }
  },
  getUserById: async (req, res) => {
    try {
      const username = req.params.username;
      const user = await userManager.getUserById(username);
      res.status(200).send(JSON.stringify(user));
    } catch (error) {
      res.status(500).send(error);
    }
  },

  registerUser: async (req, res) => {
    try {
      const body = req.body;
      const username = body.username;
      const password = body.password;
      const email = body.email;
      /*
      const hashKey = 'HashKetTest';

      const token = crypto
        .createHmac('sha256', hashKey)
        .update(username, password, email)
        .digest('hex');
*/
      const user = await userManager.registerUser({
        username,
        password,
        email,
        // token,
      });
      const access = jwt.sign({ user }, 'mySecretKey');
      res.status(200).send(`your registration token is ${access} `); //token
    } catch (error) {
      console.log('hello from controller!');
      res.status(500).send({ ok: false, message: `something went wrong` });
    }
  },

  loginUser: async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];

      if (authHeader === '' || authHeader === null) {
        res.status(400).send({ ok: false, message: `invalid user!!` });
      }
      await userManager.loginUser(authHeader);

      res.status(200).send(`access granted! welcome `);
    } catch (error) {
      console.log('hello from controller!');
      res.status(500).send('no valid username or password provided!');
    }
  },
  logoutUser: async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (authHeader === '' || authHeader === null) {
        res.status(400).send({ ok: false, message: `invalid user!!` });
      }
      await userManager.logoutUser(authHeader);
      res.status(200).send(`you successfully logged out, bye bye :) `);
    } catch (error) {
      console.log('hello from controller!');
      res.status(500).send('no valid username or password provided!');
    }
  },
};

module.exports = userController;
