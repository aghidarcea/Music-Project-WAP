let songs = [
                { songId:100, title:'Wockesha', releaseDate:'10/10/2021', audioFile:null},
                { songId:101, title:'If Pain Was A Person', releaseDate:'04/21/2021', audioFile:null},
                { songId:102, title:'Hard for the next', releaseDate:'03/23/2021', audioFile:null},
                { songId:103, title:'Yessir', releaseDate:'11/14/2019', audioFile:null},
                { songId:104, title:'Big flexer', releaseDate:'27/10/2020', audioFile:null},
                { songId:105, title:'Telepatia', releaseDate:'18/03/2021', audioFile:null},
                { songId:106, title:'I\'ll name the dogs', releaseDate:'09/11/2017', audioFile:null},
                { songId:107, title:'God blessed Texas', releaseDate:'07/15/1993', audioFile:null},
                { songId:108, title:'King of Pain', releaseDate:'05/15/1983', audioFile:null}
            ];

module.exports = class Song 
{
    constructor(songId, title, releaseDate, audioFile) 
    {
        this.songId = songId;
        this.title = title;
        this.releaseDate = releaseDate;
        this.audioFile = audioFile;
    }

    add() 
    {
        songs.push(this);
    }

    static fetchAll()
    {
        return songs;
    }

    static searchSongByTitle(searchWord)
    {
        const songList = songs.filter(s => s.title.includes(searchWord));
        return songList;
    }

    static getSongById(songId)
    {
        const song = songs.find(s => s.songId == songId);
        if(song == undefined)
            throw new Error("Couldn't find song!");
        else 
            return song;
    }
}