-- Создание таблицы ролей
create TABLE roles(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	translation VARCHAR(255) NOT NULL
)

INSERT INTO roles (name, translation)
VALUES ('user', 'Пользователь');

INSERT INTO roles (name, translation)
VALUES ('user', 'Продвинутый');

INSERT INTO roles (name, translation)
VALUES ('user', 'Мастер');

-- Создание таблица пользователей
create TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255),
    role_id INTEGER,
    sys_status VARCHAR DEFAULT 'A',
		FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Создание тестового пользователя
INSERT INTO users (email, password, name, surname, patronymic, role_id)
VALUES ('shabanyan94@gmail.com', '123123', 'Тест', 'Тестов', 'Тестович', 1);

--------------------------------------------------------------------------------------------------------------
-- Создание таблицы токенов
create TABLE token(
    id SERIAL PRIMARY KEY NOT NULL,
    userId INT NOT NULL,
    refresh VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(id)
);