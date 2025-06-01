class FileService {
    getLink(req) {
        return `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
}

export default new FileService();
