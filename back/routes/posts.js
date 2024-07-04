// routes/posts.js
const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

// router.post('/' , createPost);
// router.get('/' , getPosts);
router.post('/', auth, createPost);
router.get('/', auth,getPosts);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
