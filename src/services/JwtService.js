import jwt from 'jsonwebtoken';
import { Payload } from '../utils/Payload.js';

const secret = process.env.SECRET;
const expiresIn = process.env.TTL;

class JwtService {
    generateTokens(user) {
        const payload = new Payload(user)
        return {
            accessToken: jwt.sign({ ...payload }, secret, { expiresIn }),
        };
    }

    validate(token) {
        try {
            return jwt.verify(token, secret);
        } catch (e) {
            return null;
        }
    }
}

export default new JwtService();