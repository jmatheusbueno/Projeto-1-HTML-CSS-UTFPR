const router = require('express').Router();
const Music = require('../models/Music');

// Salvar musica
router.post('/', async (req, res) => {
    if (!req.body) {
        res.status(422).json({ error: 'Os dados não foram enviados' });
    }

    const { tittle } = req.body;

    const music = {
        tittle,
    };
    
    try {
        await Music.create(music);
        res.status(201).json({ message: 'Musica adicionada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err})
    }
});

// Get
router.get('/', async (req, res) => {
    try {
        const musics = await Music.find();
        res.status(200).json(musics);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;