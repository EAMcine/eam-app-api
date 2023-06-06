const express = require('express');
const User = require('./controller/User.class');

const app = express();
const user = new User();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    user.createUser(username, password)
        .then(() => {
            res.send('User created successfully!');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while creating the user.');
        });
});

app.get('/users', (req, res) => {
    user.getAllUsers()
        .then(([rows, fields]) => {
            res.json(rows);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while fetching the users.');
        });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
