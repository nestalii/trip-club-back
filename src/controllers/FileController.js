import fileService from '../services/FileService.js';

class FileController {
    async upload(req, res, next) {
        console.dir(req.file, { depth: null });
        await fileService.getLink(req)
            .then(() => res.status(200).json())
            .catch(next);
    }
}

export default new FileController();
