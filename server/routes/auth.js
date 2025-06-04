const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    admin,
    allUsers,
    resetPassword
} = require('../controllers/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/resetpwd', resetPassword);
router.get('/admin', admin);
router.get('/allusers', allUsers);

module.exports = router;
