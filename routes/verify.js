const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    const decoded = jwt.verify(req.body.token, 'studmetrics');
    res.send(decoded);
})

module.exports = router;
