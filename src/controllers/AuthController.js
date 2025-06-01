import authService from '../services/AuthService.js';

class AuthController {
    async signUp(req, res, next) {
        const body = req.body;
        await authService.signUp(body)
            .then((token) => res.status(201).json(token))
            .catch(next);
    }

    async signIn(req, res, next) {
        const { email, password } = req.body;
        await authService.signIn(email, password)
            .then((token) => res.status(200).json(token))
            .catch(next);
    }

    async getMe(req, res, next) {
        res.status(200).json(req.user);
    }
}

export default new AuthController();