export class Payload {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.role = user.role;
        this.avatarLink = user.avatar_link;
        this.createDate = user.create_date;
    }
}