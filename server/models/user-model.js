let users = [
                {userId:100, username:'admin100', password:'admin100', playlist:[{ songId:104, title:'Big flexer', releaseDate:'27/10/2020', audioFile:null}]}, 
                {userId:112, username:'anamaria', password:'anamaria', playlist:[]}, 
                {userId:200, username:'user2', password:'user2', playlist:[]}
            ];

module.exports = class User {

    constructor(userId, username, password) 
    {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.playlist = [];
    }

    add() 
    {
        users.push(this);
    }

    static login(username, password) 
    {
        const myUser = users.find(u => u.username == username && u.password == password);
        if(myUser == undefined)
            return undefined;
        else
        {
            const currentdate = new Date(); 
            let result = myUser.userId + "-"
                + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " "
                + myUser.username;

            return result;
        }
    }

    static getUserPlaylist(userId)
    {
        const myUser = users.find(u => u.userId == userId);
        if(myUser == undefined)
            throw new Error("addSong error: User not found");
        else
            return myUser.playlist;
    }

    static addSong(userId, song)
    {
        const myUser = users.find(u => u.userId == userId);
        if(myUser == undefined)
            throw new Error("addSong error: User not found");

        //check if song already exists to not add twice
        const existingSong = myUser.playlist.find(s => s.songId == song.songId);
        if(existingSong != undefined)
            return;
        else
            //add only if it doesn't exist
            myUser.playlist.push(song);
    }

    static removeSong(userId, songId)
    {
        const myUser = users.find(u => u.userId == userId);
        if(myUser == undefined)
            throw new Error("removeSong error: User not found");
        else
            myUser.playlist = myUser.playlist.filter(s => s.songId != songId);
    }
}