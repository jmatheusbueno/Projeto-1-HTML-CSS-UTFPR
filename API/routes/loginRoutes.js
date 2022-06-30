const router = require('express').Router();
const Login = require('../models/Login');

// Salvar login
router.post('/', async (req, res) => {

    if (!req.body) {
        res.status(422).json({ error: 'Os dados de usuário não foram enviados' });
    }

    const { username, password  } = req.body;

    const login = {
        username,
        password,
    };
    
    try {
        await Login.create(login);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err})
    }
});

// Get
router.get('/get', async (req, res) => {
    try {
        const login = await Login.find();
        res.status(200).json(login);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get
router.get('/get/:username/:password', async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    try {
        const login = await Login.findOne({username: username, password: password});
        res.status(200).json(login);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;