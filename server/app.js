const express = require('express');
const myRouter = require('./routes/user-song-router');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/music', myRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.listen(3000, () => console.log('listening to 3000...'));