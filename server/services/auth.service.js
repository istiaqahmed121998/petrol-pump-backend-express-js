
const { User } = require('../models')
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../lib/ApiError')

const loginUserWithEmailAndPassword = async (email,password)=>{

    if (!email || !password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password doesnt match');
    }
    return foundUser;
}
const accessToken = async (user) => {
    const accessToken = jwt.sign(
        {
            "userData": {
                "name":user.name,
                "email":user.email,
                "id": user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10d' }
    );
    return accessToken
}


module.exports = { loginUserWithEmailAndPassword,accessToken };