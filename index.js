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
    const { email, password, firstname, lastname, birthday, gender, group, active } = req.body;

    user.createUser(email, password, firstname, lastname, birthday, gender, group, active)
        .then(() => {
            console.log('User created successfully!');  // Ajouté ici
            res.send('User created successfully!');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while creating the user.');
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    user.loginUser(email, password)
        .then((user) => {
            console.log('User logged in successfully!');
            res.json(user);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while logging in.');
        });
});

app.post('/sendFilms', (req, res) => {

});

app.get('/users', (req, res) => {
    user.getAllUsers()
        .then((rows) => {
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
