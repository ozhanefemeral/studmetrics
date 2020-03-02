module.exports = (req, res, next) => {
    try {
        req.body.schoolId = 1
        next()
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};