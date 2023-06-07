const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eam',
    port: 8889,
});

class User {
    createUser(email, password, firstname, lastname, birthday, gender, group, active) {
        const query = `INSERT INTO users (email, password, firstname, lastname, birthday, gender, \`group\`, active)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        return pool.query(query, [email, password, firstname, lastname, this.convertDate(birthday), gender, group, active]);
    }

    getAllUsers() {
        const query = `SELECT *
                       FROM users`;
        return pool.query(query);
    }

    loginUser(email, password) {
        const query = `SELECT *
                       FROM users
                       WHERE email = ?`;
        return pool.query(query, [email])
            .then((rows) => {
                if (rows.length === 0) {
                    throw new Error("No user with this email address.");
                } else {
                    const user = rows[0];
                    if (user.password !== password) {
                        throw new Error("Incorrect password.");
                    }
                    return user;
                }
            });
    }


    convertDate(inputFormat) {
        // Split the date into day, month, and year
        const [day, month, year] = inputFormat.split('-');

        // Create a new Date object
        const d = new Date(`${year}-${month}-${day}`);

        // Check if date is valid
        if (isNaN(d.getTime())) {
            throw new Error(`Invalid date: ${inputFormat}`);
        }

        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    }


}

module.exports = User;
