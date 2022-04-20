let songs = [
                { songId:100, title:'Wockesha', releaseDate:'10/10/2021', audioFile:'../../music/Moneybagg_Yo_Wockesha.mp3'},
                { songId:101, title:'If Pain Was A Person', releaseDate:'04/21/2021', audioFile:'../../music/Moneybagg_Yo_If_Pain_Was_A_Person.mp3'},
                { songId:102, title:'Hard for the next', releaseDate:'03/23/2021', audioFile:'../../music/MoneyBagg_Yo_Hard_For_The_Next.mp3'},
                { songId:103, title:'Yessir', releaseDate:'11/14/2019', audioFile:'../../music/Tory_Lanez_Yessirr.mp3'},
                { songId:104, title:'Big flexer', releaseDate:'27/10/2020', audioFile:'../../music/Lakeyah_Big_FlexHer.mp3'},
                { songId:105, title:'Telepatia', releaseDate:'18/03/2021', audioFile:'../../music/Kali_Uchis_Telepatia.mp3'},
                { songId:106, title:'I\'ll name the dogs', releaseDate:'09/11/2017', audioFile:'../../music/Blake_Shelton_Ill_Name_The_Dogs.mp3'},
                { songId:107, title:'God blessed Texas', releaseDate:'07/15/1993', audioFile:'../../music/Little_Texas_God_Blessed_Texas.mp3'},
                { songId:108, title:'King of Pain', releaseDate:'05/15/1983', audioFile:'../../music/The_Police_King_Of_Pain.mp3'}
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