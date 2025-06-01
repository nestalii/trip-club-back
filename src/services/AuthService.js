import db from '../../database/Db.js';
import { HttpError } from '../utils/HttpError.js';
import jwtService from './JwtService.js';
import bcrypt from 'bcrypt';

class AuthService {
    async signUp(body) {
        const candidate = await this.getUser(body.email);
        if (candidate) throw HttpError.emailIsAlreadyTaken(body.email);

        const hashedPassword = await bcrypt.hash(body.password, 7);
        const query = `INSERT INTO users(
                  email, 
                  password, 
                  first_name, 
                  last_name, 
                  role
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const user = await db.queryOne(query, [
            body.email,
            hashedPassword,
            body.firstName,
            body.lastName,
            body.role
        ]);

        delete user.password;

        return this.getToken(body.email);
    }

    async signIn(email, password) {
        const user = await this.getUser(email);
        if (!user) throw HttpError.invalidEmailOrPassword();

        const isEquals = await bcrypt.compare(password, user.password);
        if (!isEquals) throw HttpError.invalidEmailOrPassword();

        return this.getToken(email);
    }

    async getUser(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        return db.queryOne(query, [email]);
    }

    async getToken(email) {
        const user = await this.getUser(email);
        return jwtService.generateTokens(user);
    }
}

export default new AuthService();