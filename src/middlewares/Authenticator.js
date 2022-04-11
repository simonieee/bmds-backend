/**
 *
 */

import JWTManager from '../utils/JWTManager';

export const UserAuthenticator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const rawToken = authorization.split('Bearer ');
      const jm = new JWTManager();
      const token = await jm.verify(rawToken[1]);
      if (token) {
        next();
        return;
      }
    }
    return res.status(401).json({
      status: 401,
      data: false,
      message: 'Access denied',
    });
  } catch (error) {}
};
