import { Router } from 'express';
import tripController from "../controllers/TripController.js";

const tripRouter = new Router();

tripRouter.get('/:id', tripController.getById);
tripRouter.get('/', tripController.getAll);
tripRouter.post('/', tripController.create);
tripRouter.patch('/:id', tripController.update);
tripRouter.delete('/:id', tripController.delete);

export default tripRouter;