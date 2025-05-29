export class HttpError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }

    static emailIsAlreadyTaken(email) {
        return new HttpError(409, `Email ${email} вже зайнятий`);
    }

    static invalidEmailOrPassword() {
        return new HttpError(404, 'Неправильна електронна пошта або пароль');
    }

    static unauthorized() {
        return new HttpError(401, 'Неавторизований доступ');
    }

    static invalidData(errors) {
        return new HttpError(400, 'Неправильно заповнені дані', errors);
    }

    static tripNotFound(id) {
        return new HttpError(404, `Подорож з id=${id} не знайдена`);
    }
}
