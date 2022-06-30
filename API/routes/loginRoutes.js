const router = require('express').Router();
const Login = require('../models/Login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Salvar login
router.post('/auth/register', async (req, res) => {

    if (!req.body) {
        res.status(422).json({ error: 'Os dados de usuário não foram enviados' });
    }

    const { username, password  } = req.body;

    const userExists = await Login.findOne({ username });
    if (userExists) {
       return res.status(422).json({ msg: 'Esta conta já está em uso' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const login = new Login({
        username,
        password: passwordHash,
    });
    
    try {
        await Login.create(login);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err})
    }
});

// Login User
router.post("/auth/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await Login.findOne({ username });
    if (!user) {
       return res.status(422).json({ msg: 'Usuário não encontrado' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida' });
    }

    try {
        const secret = '123';
        console.log(secret);
        const token = jwt.sign(
            {
                id: user._id,
            }, 
            secret,
        );

        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
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

// Private Route
router.get('/get/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    const user = await Login.findById(id, '-password');

    if (!user) {
        res.status(500).json({ error: 'Usuário não encontrado' });
    };

    res.status(200).json({ user });

});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado' });
    }

    try {
        const secret = '123';
        jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token invalido' });
    }
}

module.exports = router;