const authService = require("../services/auth.service.js")

const login = async (req, res, next) => {

  const { email, password } = req.body;
  try {
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = await authService.accessToken(user);
    res.send({ "userData":{id:user.id,fullName:user.name,email:user.email}, "accessToken":"Bearer "+token });
  } catch (error) {
    next(error)
  }
};

const authMe = async (req, res,next) => {
  try {
    res.send({"userData":req.user})
  } catch (error) {
    next(error)
  }
};


module.exports = {
  login,
  authMe
};