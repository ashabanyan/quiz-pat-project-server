const db = require("../db");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const UserDTO = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, name, surname, patronymic, role_id) {
    const users = await db.query("SELECT * FROM users");
    const candidate = users.rows.find((item) => item.email === email);
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует!`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const newUserReq = await db.query(
      "INSERT INTO users (email, password, name, surname, patronymic, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, hashPassword, name, surname, patronymic, role_id]
    );
    const newUser = newUserReq.rows[0];

    // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDTO(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(newUser.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const users = await db.query("SELECT * FROM users");
    const candidate = users.rows.find((item) => item.email === email);

    if (!candidate) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, candidate.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Некорректный пароль");
    }

    const userDto = new UserDTO(candidate);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(candidate.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }

    const user = await db.query("SELECT * FROM users where id=$1", [
      userData.id,
    ]);

    const userDto = new UserDTO(user.rows[0]);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsera() {
    const usersDb = await db.query("SELECT * FROM users");
    const users = usersDb.rows;
    return users;
  }
}

module.exports = new UserService();
