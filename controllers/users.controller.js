const db = require('../db')

class UserController {
    async loginUser(req, res) {
        const users = await db.query('SELECT * FROM users')
        const login = req.query.login
        const password = req.query.password
        const user = users.rows.find(item => item.login === login && item.password === password)
        const status = user ? 200 : 404
        res.sendStatus(status)
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM users')
        res.json(users.rows)
    }
    
    async createUser(req, res) {
        const { name, surname } = req.body
        const newPerson = await db.query(`INSERT INTO users (name, surname) VALUES ($1, $2) RETURNING *`, [name, surname])
        res.json(newPerson.rows[0])
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const users = await db.query('SELECT * FROM users where id = $1', [id])
        res.json(users.rows[0])
    }

    async updateUser(req, res) {
        const { id, name, surname } = req.body
        const user = await db.query(`UPDATE users set name = $1, surname = $2 where id = $3 RETURNING *`, [name, surname, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const users = await db.query('DELETE * FROM users where id = $1', [id])
        res.json(users.rows[0])
    }
}

module.exports = new UserController