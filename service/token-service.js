const db = require("../db");
const jwt = require("jsonwebtoken");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "20d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const user = await db.query(`SELECT * FROM token WHERE userid = $1`, [
      userId,
    ]);
    if (user.rows.length) {
      const { id, userid, refresh } = user.rows[0];
      await db.query(
        `UPDATE token set userid = $1, refresh = $2 where id = $3`,
        [userid, refreshToken, id]
      );
    } else {
      const token = await db.query(
        `INSERT INTO token (userid, refresh) VALUES ($1, $2)`,
        [userId, refreshToken]
      );
      return token;
    }
  }

  async removeToken(refreshToken) {
    const token = await db.query(
      `UPDATE token set refresh = $1 where refresh = $2`,
      [null, refreshToken]
    );
    return token;
  }

  async findToken(refreshToken) {
    const token = await db.query(`SELECT * FROM token WHERE refresh = $1`, [
      refreshToken,
    ]);
    return token.rows[0];
  }
}

module.exports = new TokenService();
