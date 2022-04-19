const User = require('../models/user-model');
const Song = require('../models/song-model');

//username and pwd have to be sent in query like
///music/login?username=anamaria&password=anamaria
exports.login = (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
    const result = User.login(username, password);
    if(result == undefined)
        res.status(401).send("Login failed! Check your credentials and try again.");
    else
        res.status(200).send(result);
}

//gets the user's playlist
//and the list of all songs
exports.getUserSongs = (req, res, next) => {
    const userId = req.params.userId;
    try
    {
        let result = {};
        result.userPlaylist = User.getUserPlaylist(userId);
        result.allSongs = Song.fetchAll();
        res.status(200).json(result);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
}

exports.addSong = (req, res, next) => {
    const userId = req.params.userId;
    const songId = req.params.songId;
    try
    {
        const song = Song.getSongById(songId);
        User.addSong(userId, song);
        res.status(201).send("Song added successfully");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
}

exports.removeSong = (req, res, next) => {
    const userId = req.params.userId;
    const songId = req.params.songId; //fix this later
    try
    {
        User.removeSong(userId, songId);
        res.status(201).send("Song removed");
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
}

//gets filtered list of songs
exports.searchSongByTitle = (req, res, next) => {
    const searchWord = req.params.searchWord;
    res.status(200).json(Song.searchSongByTitle(searchWord));
}