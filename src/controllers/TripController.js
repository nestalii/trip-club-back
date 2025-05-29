import tripService from '../services/TripService.js';
import { validationResult } from 'express-validator';
import { HttpError } from '../utils/HttpError.js';

class TripController {
    async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(HttpError.invalidData(errors.array()));

        const trip = req.body;
        await tripService.create(trip)
            .then((data) => res.status(201).json({ success: true, data }))
            .catch(next);
    }

    async update(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(HttpError.invalidData(errors.array()));

        const id = req.params.id;
        const trip = req.body;
        await tripService.update(id, trip)
            .then(() => res.status(200).json({ success: true }))
            .catch(next);
    }

    async delete(req, res, next) {
        const id = req.params.id;
        await tripService.delete(id)
            .then(() => res.status(200).json({ success: true }))
            .catch(next);
    }

    async getAll(req, res, next) {
        const queryParams = req.query;
        await tripService.getAll(queryParams)
            .then((data) => res.status(200).json({ success: true, data }))
            .catch(next);
    }

    async getById(req, res, next) {
        const id = req.params.id;
        await tripService.getById(id)
            .then((data) => {
                if (!data) return next(HttpError.notFound('Подорож не знайдена'));
                return res.status(200).json({ success: true, data });
            })
            .catch(next);
    }
}

export default new TripController();
