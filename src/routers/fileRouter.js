import { Router } from 'express';
import fileController from '../controllers/FileController.js';
import { upload } from '../utils/multer.js';

const fileRouter = Router();

fileRouter.post('/', upload.single('file'), fileController.upload);

export default fileRouter;
