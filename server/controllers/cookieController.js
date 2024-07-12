import jwt from 'jsonwebtoken'
export const cookieController = {};

cookieController.createCookie = (req, res, next) => { 
    const { token1 } = res.locals;
    res.cookie('token', token1, { httpOnly: true, secure: true, sameSite: 'strict' });

    if (res.locals.token2) {
        const { token2 } = res.locals;
        res.cookie('adminToken', token2, { httpOnly: true, secure: true, sameSite: 'strict' });
    }

    return next();
}

