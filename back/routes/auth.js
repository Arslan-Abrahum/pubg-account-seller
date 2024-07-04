// routes/auth.js
const express = require('express');
const { signup, login, getMe, deleteAuth, getAuth,updateUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get("/getauth", getAuth)
router.delete('/:id', deleteAuth);
router.put('/update',auth, updateUser);
router.get('/me', auth, getMe);

module.exports = router;
