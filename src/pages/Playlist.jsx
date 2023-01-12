import React from "react";
import { useEffect, useState } from "react";
import Musiccard from "../components/Musiccard";

import Form from 'react-bootstrap/Form';
import Trash from "../icons/trash.svg";
import classes from "../css/Playlist.module.css";

function Playlist() {
    const [Playlists, setPlaylists] = useState([]);
    const [Songs, setSongs] = useState([]);
    const [SongId, setSongId] = useState(0);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        getPlaylists();
        getSongs();
    }, []);

    async function getPlaylists(){
        try{
        const response = await fetch('https://localhost:7023/Playlist', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            withCredentials: true});

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        setPlaylists(result);
        setLoading(false);
        return result;
        } catch (err) {
            console.log(err);
        }
    }

    async function getSongs(){
        try{
        const response = await fetch('https://localhost:7023/Song', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            withCredentials: true});

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        setSongs(result);
        return result;

        } catch (err) {
            console.log(err);
        }
    }

    async function addSongToPlaylist(playlistId){
        try{
            if (SongId === 0){
                alert("Please select a song to add.");
                return;
            }
            
            const response = await fetch('https://localhost:7023/Playlist/' + playlistId + '/Song/' + SongId, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                withCredentials: true});
            
            const result = await response.text();

            if (!response.ok){
                alert(result);
                throw new Error(`Error! status: ${response.status}`);
            }

            window.location.href = "http://localhost:3000/playlist";
        } catch (err) {
            console.error(err);
        }
    }

    async function createPlaylist(){
        try{
            const playlistName = document.getElementById("playlistName").value;
            const response = await fetch('https://localhost:7023/Playlist?' + new URLSearchParams({title: playlistName}), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                withCredentials: true});

            const result = await response.text();
            
            if (!response.ok){
                alert(result);
                throw new Error(`Error! status: ${response.status}`);
            }

            window.location.href = "http://localhost:3000/playlist";
        } catch (err) {
            console.log(err);
        }
    }

    async function deletePlaylist(playlistId){
        try{
            const response = await fetch('https://localhost:7023/Playlist/' + playlistId, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                withCredentials: true});

            const result = await response.text();

            if (!response.ok) {
                alert(result);
                throw new Error(`Error! status: ${response.status}`);
            }

            window.location.href = "http://localhost:3000/playlist";
        } catch (err) {
            console.log(err);
        }
    }

    function changeSong(event){
        setSongId(event.target.value);
    }
    

    if (Loading) {
        return(
            <div className={classes.container}>
                <input type="text" placeholder="Playlist Name" id="playlistName" name="playlistName" className={classes.name} />
                <button className={classes.create} onClick={createPlaylist} id="createPlaylist">Create Playlist</button>
                <span className="loader"></span>
            </div>
        );
    }
    else {
        console.log(Playlists);
        return(
            <div className={classes.container}>
                <input type="text" placeholder="Playlist Name" id="playlistName" name="playlistName" className={classes.name} />
                <button className={classes.create} onClick={createPlaylist} id="createPlaylist">Create Playlist</button>
                <div id="playlists">
                {Playlists.map((playlist, index) => {
                    return(
                        <div key={index} className={classes.playlist} id={playlist.name}>
                            <h1 className={classes.playlistName}>
                                {playlist.name}
                            </h1>
                            <img className={classes.trash} src={Trash} alt="trash" id="deletePlaylist" onClick={() => deletePlaylist(playlist.id)}/>
                            <br />
                            <select aria-label="Choose a song to add." id="songs" onClick={changeSong}>
                                <option>Choose a song</option>
                                {Songs.map((song, index) => {
                                    return(
                                        <option key={index} value={song.songID} id={song.title} name={song.title}>{song.title}</option>
                                    );
                                })}
                            </select>
                            <button className={classes.addSong} id="addSong" onClick={() => addSongToPlaylist(playlist.id)}>Add Song</button>
                            <div className={classes.songs} id="songss">
                                {playlist.songs.map((song, index) => (
                                    <div className={classes.song} id="song">
                                    <Musiccard key={index} title={song.title} artist={song.artist} link={song.link} id={song.songID} playlistId={playlist.id} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        );
    }
}
export default Playlist;