module.exports = class UserDTO {
    id;
    email;
    name;
    surname;
    patronymic;
    role_id;


    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.name = model.name;
        this.surname = model.surname;
        this.patronymic = model.patronymic;
        this.role_id = model.role_id;
    }
}