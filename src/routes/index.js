const express = require('express');
const routerUser = require('./user.router');
const routerPost = require('./post.router');
const router = express.Router();

router.use('/users', routerUser)
router.use('/posts', routerPost)

module.exports = router;