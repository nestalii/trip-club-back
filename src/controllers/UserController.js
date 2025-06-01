import userService from '../services/UserService.js';

class UserController {
    async update(req, res, next) {
        const id = req.user.id;
        const user = req.body;
        await userService.update(id, user)
            .then(() => res.status(200).json())
            .catch(next);
    }

    async getUserTrips(req, res, next) {
        const { id, role } = req.user;
        await userService.getUserTrips(id, role)
            .then((data) => res.status(200).json(data))
            .catch(next);
    }

    async delete(req, res, next) {
        const id = req.user.id;
        await userService.delete(id)
            .then(() => res.status(204).json())
            .catch(next);
    }
}

export default new UserController();