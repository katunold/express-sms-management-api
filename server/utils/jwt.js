import * as JWT from 'jsonwebtoken'
import expressJwt from 'express-jwt';
export const signToken = (userId, admin) => {
    return JWT.sign(
      {
          iss: process.env.JWT_ISSUER,
          sub: userId,
          isAdmin: admin,
          iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
},
    process.env.JWT_SECRET
);
};

export const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    requestProperty: 'auth'
});

/**
 * function to check user authorization status
 */
export const hasAuthorization = (req, res, next) => {

    if (req.auth.sub === req.body.receiverId) {
        return res.status(403).send({
            error: 'User is not authorised'
        });
    }
    next();
};

/**
 * function to check for admin authority
 */
export const hasAdminAuthority = (req, res, next) => {
    if (req.auth.isAdmin) {
        return next();
    }
    return res.status(403).send({
        error: 'User not authorised for this action'
    });
};
