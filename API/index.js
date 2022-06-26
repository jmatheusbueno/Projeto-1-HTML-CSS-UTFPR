// config inicial
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// rotas
const musicRoutes = require('./routes/musicRoutes');
app.use('/music', musicRoutes);

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended:true,
    }),
);

app.use(express.json());

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'ok!' });
})

// entregar uma porta
const DB_USER = '###';
const DB_PASSWORD = encodeURIComponent('###');

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@projetoweb.7mldl.mongodb.net/projeto_web?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000);
    })
    .catch((err) => console.log(err));
