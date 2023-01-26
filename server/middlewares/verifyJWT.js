const jwt = require('jsonwebtoken');
const ApiError = require('../lib/ApiError')
const httpStatus = require('http-status');
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) 
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Not Valid Token');
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err)                 
                throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is expired',true,err);
            req.user = decoded.userData;
            next();
        }
    );
}

module.exports = verifyJWT