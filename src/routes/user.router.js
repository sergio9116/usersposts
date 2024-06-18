const { getAll, create, getOne, remove, update, login, setPosts } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');
const { getMe } = require('../controllers/post.controllers');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create);

routerUser.route('/login')
    .post(login)

routerUser.route('/:id/post')
    .post(verifyJwt, setPosts)

routerUser.route('/me')
    .post(verifyJwt, getMe)

routerUser.route('/:id')
    .get(verifyJwt, getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerUser;