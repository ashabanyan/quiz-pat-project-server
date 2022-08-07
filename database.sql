-- Создание таблицы ролей
create TABLE roles(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	translation VARCHAR(255) NOT NULL
)

INSERT INTO roles (name, translation)
VALUES ('user', 'Пользователь');

INSERT INTO roles (name, translation)
VALUES ('advanced', 'Продвинутый');

INSERT INTO roles (name, translation)
VALUES ('master', 'Мастер');

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

--------------------------------------------------------------------------------------------------------------
-- Создание таблицы категорий
create TABLE category(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL
);

INSERT INTO category (name, translation) VALUES ('history', 'История') 

--------------------------------------------------------------------------------------------------------------
-- Создание таблицы  уровней

create TABLE level(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL
);

INSERT INTO level (name, translation) VALUES ('easy', 'Легкий') 
INSERT INTO level (name, translation) VALUES ('medium', 'Средний') 
INSERT INTO level (name, translation) VALUES ('hard', 'Сложный') 

--------------------------------------------------------------------------------------------------------------
-- Создание таблицы  файлов
CREATE TABLE files (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	extension VARCHAR(10) NOT NULL,
	filename VARCHAR(255) NOT NULL
)

--------------------------------------------------------------------------------------------------------------
-- Создание таблицы основной сущности квиз
create TABLE quiz(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL,
    level_id INTEGER NOT NULL,
    creator_id INTEGER NOT NULL,
    cover_id INTEGER NOT NULL,
    access_roles_id INTEGER[],
    sys_status VARCHAR DEFAULT 'A',
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (level_id) REFERENCES level(id),
    FOREIGN KEY (creator_id) REFERENCES users(id)
    FOREIGN KEY (cover_id) REFERENCES files(id)
);

INSERT INTO quiz (name, category_id, level_id, creator_id, access_roles_id) 
VALUES ('История СССР', 1, 1, 3, ARRAY [1,2,3])