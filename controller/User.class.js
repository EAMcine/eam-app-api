const mysql = require('mysql2');

class User {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'eam',
            port : 8889
        });
    }

    createUser(username, password) {
        const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
        return this.connection.promise().execute(query, [username, password]);
    }

    getAllUsers() {
        const query = `SELECT * FROM users`;
        return this.connection.promise().query(query);
    }

    loginUser() {

    }

    registerUser() {

    }
}

module.exports = User;
