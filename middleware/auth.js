const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'studmetrics');
        req.body = { ...req.body, ...decoded }
        next()
    } catch (err) {
        res.status(401).json(err);
    }
};