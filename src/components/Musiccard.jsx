import React, { useEffect } from 'react';

import classes from "../css/Musiccard.module.css";
import Trash from "../icons/trash.svg";
import 'bootstrap/dist/css/bootstrap.min.css';

function Musiccard({title, artist, link, id}){
    const Title = title;
    const Artist = artist;
    const SongLink = link;
    const SongId = id;

    const audioTune = new Audio(SongLink);
    useEffect(() => {
        audioTune.load();
    }, []);

    const playSound = () => {
    audioTune.play();
    };

    const pauseSound = () => {
    audioTune.pause();
    };

    const stopSound = () => {
    audioTune.pause();
    audioTune.currentTime = 0;
    };

    function deleteSong(){
        try{
            fetch("https://localhost:7023/Song/" + SongId, {method: "DELETE"});
            console.log("delete");
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className={classes.card}>
            <h2 id="songID" className={classes.SongID}>{SongId}</h2>
            <div className={classes.infoBox}>
                <h1 className={classes.songTitle}>{Title}</h1>
                <p className={classes.artistTitle}>{Artist}</p>
            </div>

            <img src={Trash} class={classes.trashIcon} onClick={deleteSong}></img>
            <button className={classes.btnPlay} onClick={playSound}>Play</button>
            <button className={classes.btnPause} onClick={pauseSound}>Pause</button>
            <button className={classes.btnStop} onClick={stopSound}>Stop</button>
        </div>
    );
}

export default Musiccard;