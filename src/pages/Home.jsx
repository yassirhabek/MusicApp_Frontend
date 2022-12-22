import React, { useState, useEffect } from "react";
import MusicCard from "../components/Musiccard";

import "../css/Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [Songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllSongs();
    }, []);



    async function getAllSongs(){
        try {
            const response = await fetch('https://localhost:7023/Song', {method: 'GET', headers: {accept: 'application/json'}});
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            setSongs(result);
            console.log(result);
            setIsLoading(false);
            return result;
        } catch (err) {
            console.log(err);
          }
    }

    if (isLoading) {
        return(
            <span className="loader"></span>
        );
    }
    else {
        return(
            <div className="gridContainer">
                {Songs.map((song, index) => {
                    return (
                        <div key={index}> 
                            <MusicCard title={song.title} artist={song.artist} link={song.link} id={song.songID} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default Home;