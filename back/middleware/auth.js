// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'my_pubg_web';

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
}
let tokenWithoutBearer;
if (token.startsWith('Bearer ')) {
    tokenWithoutBearer = token.slice(7); // Remove "Bearer " from the token
} else {
    return res.status(401).json({ message: 'Invalid token format' });
}
try {
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);
    req.user = decoded;
    console.log(req.user, decoded, "checking");
    next();
} catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
}
};
