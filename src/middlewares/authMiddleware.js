import { HttpError } from '../utils/HttpError.js';
import jwtService from '../services/JwtService.js';

export const authMiddleware = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return next(HttpError.unauthorized());

    const user = jwtService.validate(accessToken);
    if (!user) return next(HttpError.unauthorized());

    req.user = user;
    next()
}