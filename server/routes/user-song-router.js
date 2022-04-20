const express = require('express');
const userSongController = require('../controllers/user-song-controller');

const router = express.Router();

router.get('/login', userSongController.login);

router.get('/:userId', userSongController.getUserSongs);

router.get('/:userId/searchSong/:searchWord', userSongController.searchSongByTitle);

router.post('/:userId/addSong/:songId', userSongController.addSong);

router.delete('/:userId/deleteSong/:songId', userSongController.removeSong);

module.exports = router;