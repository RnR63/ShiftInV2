import jwt from 'jsonwebtoken'
const cookieController = {};

cookieController.createCookie = (req, res, next) => { 
    // 1. access username from res.locals
    const { token } = res.locals;

    // 2. save the token in res.locals
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  
    return next();
}

export default cookieController;
