import tripService from '../services/TripService.js';

class TripController {
    async create(req, res, next) {
        const trip = req.body;
        await tripService.create(trip)
            .then(() => res.status(201).json())
            .catch(next);
    }

    async update(req, res, next) {
        const id = req.params.id;
        const trip = req.body;
        await tripService.update(id, trip)
            .then(() => res.status(200).json())
            .catch(next);
    }

    async delete(req, res, next) {
        const id = req.params.id;
        await tripService.delete(id)
            .then(() => res.status(200).json())
            .catch(next);

    }

    async getAll(req, res, next) {
        const queryParams = req.query;
        await tripService.getAll(queryParams)
            .then((data) => res.status(200).json(data))
            .catch(next);
    }

    async getById(req, res, next) {
        const id = req.params.id;
        await tripService.getById(id)
            .then((data) => res.status(200).json(data))
            .catch(next);
    }

    async registerUserTrip(req, res, next) {
        const tripId = req.body.tripId;
        const userId = req.user.id;
        await tripService.registerUserTrip(userId, tripId)
            .then(() => res.status(200).json())
            .catch(next);
    }
}

export default new TripController();
