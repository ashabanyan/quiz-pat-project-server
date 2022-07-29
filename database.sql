create TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    patronymic VARCHAR(255),
	password VARCHAR(10),
    role SERIAL
);

INSERT INTO users (login, name, surname, patronymic, password, role)
VALUES ('test', 'Тест', 'Тестов', 'Тестович', '123123', 1);