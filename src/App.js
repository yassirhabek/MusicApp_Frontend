import './App.css';
import { useState, useEffect } from 'react';
import storage from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';

function App() {
 const [file, setFile] = useState("");
 const [songUrl, setUrl] = useState("");
 const [percent, setPercent] = useState(0);

 useEffect(() => console.log(songUrl), [songUrl]);

 function handleChange(event) {
     setFile(event.target.files[0]);
 }

 const handleUpload = () => {
     if (!file) {
        alert("Please upload an song first!");
     }
     if (document.getElementById("songName").value === ""){
        alert("Please enter a song name");
     }
     if (document.getElementById("artistName").value === ""){
        alert("Please enter an artist name");
     }

     const storageRef = ref(storage, `/files/${file.name}`);
     const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on(
         "state_changed",
         (snapshot) => {
             const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             setPercent(percent); 
         },
         (err) => console.log(err),
         () => {
             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  setUrl(url);
             });
         }
     );

     fetch("https://localhost:7023/Song?" + new URLSearchParams({
        title: document.getElementById("songName").value,
        artist: document.getElementById("artistName").value,
        url: songUrl}), {method: "POST"})
        .then(response => response.json())
        .then(data => console.log(data));
        }

 return (
     <div className='Main'>
        <div className='SongData'>
            <Textfield type="text" id="songName" label="Song Name" variant="outlined"/>
            <Textfield type="text" id="artistName" label="Artist Name" variant="outlined"/>
        </div>
        <div className='FileUpload'>
         <input type="file" onChange={handleChange} accept="audio/* " />
         <Button onClick={handleUpload}>Upload</Button>
         <p>{percent}% done</p>
        </div>
     </div>
 );
}

export default App;
