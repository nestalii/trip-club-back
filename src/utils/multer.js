import multer from 'multer';
import * as path from 'node:path';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../../public/uploads'));
    },
    filename: (req, file, cb) => {
        const unique = crypto.randomUUID();
        const ext = path.extname(file.originalname);
        cb(null, `${unique}${ext}`);
    },
});
export const upload = multer({ storage });
