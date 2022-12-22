import React from "react";
import { useEffect, useState } from "react";
import Musiccard from "../components/Musiccard";

import classes from "../css/Playlist.module.css";


function Playlist() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPlaylists();
        console.log(loading);
        console.log(playlists);
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
        setPlaylists({...result});
        setLoading(false);
        return result;
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return(
            <span className="loader"></span>
        );
    }
    else {
        return(
            <div className={classes.container}>
                {playlists.map((playlist, index) => {
                    <div key={index}>
                        <div>
                            {playlist.name}
                        </div>
                        <div id='playlistId'>
                            {playlist.id}
                        </div>
                        <div>
                            {playlist.songs.map((song, index) => (
                                <Musiccard key={index} title={song.title} artist={song.artist} link={song.link} id={song.songID} />
                            ))}
                        </div>
                    </div>
                })}   
            </div>
            
        );
    }
}
export default Playlist;