const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'studmetrics');
        req.body = { ...req.body, ...decoded }
        next()
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};