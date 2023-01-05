import React from "react";
import { useEffect, useState } from "react";
import Musiccard from "../components/Musiccard";

import classes from "../css/Playlist.module.css";

function Playlist() {
    const [Playlists, setPlaylists] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        getPlaylists();
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

    

    if (Loading) {
        return(
            <span className="loader"></span>
        );
    }
    else {
        console.log(Playlists);
        return(
            <div className={classes.container}>
                {Playlists.map((playlist, index) => {
                    return(
                        <div key={index} className={classes.playlist}>
                            <h1 className={classes.playlistName}>
                                {playlist.name}
                            </h1><br />
                            <div className={classes.songs}>
                                {playlist.songs.map((song, index) => (
                                    <div className={classes.song}>
                                    <Musiccard key={index} title={song.title} artist={song.artist} link={song.link} id={song.songID} playlistId={playlist.id} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default Playlist;