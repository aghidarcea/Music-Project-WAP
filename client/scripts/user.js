var myAudio;
var isPlaying;

window.onload = function() {
    document.getElementById('logo').innerText = sessionStorage.getItem('userName') + "'s bootleg spotify";
    getAllSongs();

    document.getElementById('logoutForm').onsubmit = (event) => { 
        event.preventDefault(); //prevent reloading page
        logout();
    };
    
    document.getElementById('searchForm').onsubmit = (event) => { 
        event.preventDefault(); //prevent reloading page
        searchSongByTitle();
    };

    myAudio = document.getElementById("audio");
    isPlaying = false;
}

function logout()
{
    sessionStorage.clear();
    window.location.href = './login-page.html';
}

async function searchSongByTitle()
{
    const searchWord = document.getElementById('inputSearch').value.trim();
    if(searchWord)
    {
        const urlGetSongs = 'http://localhost:3000/music/' 
            + sessionStorage.getItem('userId') + '/searchSong/' + searchWord;
        let songs = await fetch(urlGetSongs).then(response => response.json());
        populateAllSongsTable(songs);
    }
    else
        getAllSongs();
}

async function getAllSongs()
{
    const urlGetSongs = 'http://localhost:3000/music/' + sessionStorage.getItem('userId');
    let songs = await fetch(urlGetSongs).then(response => response.json());
    populateAllSongsTable(songs.allSongs);
    populatePlaylistTable(songs.userPlaylist);
}

function populateAllSongsTable(allSongs)
{
    let table = document.getElementById("allSongsTable");
    table.innerHTML = "";
    let rowCount = 0;
    let row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= "Id";
    row.insertCell(1).innerHTML= "Title";
    row.insertCell(2).innerHTML= "Release date";
    row.insertCell(3).innerHTML= "Actions";

    for(let i = 0; i<allSongs.length; i++)
    {
        rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        
        row.insertCell(0).innerHTML= allSongs[i].songId;
        row.insertCell(1).innerHTML= allSongs[i].title;
        row.insertCell(2).innerHTML= allSongs[i].releaseDate;
        const callFunction = "addSongToPlaylist("+ allSongs[i].songId + ")";
        row.insertCell(3).innerHTML= '<td><button onclick="' + callFunction + '">+</button></td>';
    }
}

async function addSongToPlaylist(songId)
{
    const addSongUrl = 'http://localhost:3000/music/' + sessionStorage.getItem('userId')
        + '/addSong/' + songId;
    let result = await fetch(addSongUrl, {
        method: 'POST'
    }).then(res => console.log(addSongUrl + " result:" + res.status));
    getAllSongs();
}

async function removeSongFromPlaylist(songId)
{
    const deleteSongUrl = 'http://localhost:3000/music/' + sessionStorage.getItem('userId')
        + '/deleteSong/' + songId;
    let result = await fetch(deleteSongUrl, {
        method: 'DELETE'
    }).then(res => console.log(deleteSongUrl + " result:" + res.status));
    getAllSongs();
}


function populatePlaylistTable(userPlaylist)
{
    let table = document.getElementById("playlistTable");
    let noPlaylistLabel = document.getElementById("noPlaylist");

    if(userPlaylist.length == 0)
    {
        table.hidden = true;
        noPlaylistLabel.hidden = false;
    }
    else
    {
        table.innerHTML = "";
        table.hidden = false;
        noPlaylistLabel.hidden = true;
        let rowCount = 0;
        let row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML= "Id";
        row.insertCell(1).innerHTML= "Title";
        row.insertCell(2).innerHTML= "Actions";

        for(let i = 0; i< userPlaylist.length; i++)
        {
            rowCount = table.rows.length;
            let row = table.insertRow(rowCount);
        
            row.insertCell(0).innerHTML= userPlaylist[i].songId;
            row.insertCell(1).innerHTML= userPlaylist[i].title;
            const removeFunction = "removeSongFromPlaylist("+ userPlaylist[i].songId + ")";
            const playFunction = "changeSong('" + userPlaylist[i].audioFile  + "')";
            row.insertCell(2).innerHTML= '<td><button onclick="' + removeFunction + '">-</button>' 
            + '<button onclick="' + playFunction + '">></button></td>';
        }
    }
}

function changeSong(srcPath)
{
    if(isPlaying)
    {
        myAudio.pause();
        isPlaying = false;
    }

    myAudio.src=srcPath;

    myAudio.play();
    isPlaying = true;
}

function play() 
{

    if(isPlaying)
        myAudio.pause();
    else
        myAudio.play();

    isPlaying = !isPlaying;
}