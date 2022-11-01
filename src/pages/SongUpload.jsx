import '../css/SongUpload.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import storage from '../firebaseConfig';
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

 function postSong(){
    fetch("https://localhost:7023/Song?" + new URLSearchParams({
        title: document.getElementById("songName").value,
        artist: document.getElementById("artistName").value,
        songLink: songUrl}), {method: "POST"})
        .then(response => response.json())
        .then(data => console.log("succesful", data));
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
             const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
             setPercent(percent); 
         },
         (err) => console.log(err),
         () => {
             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  setUrl(url);
             });
         }
     );

     postSong();
    }

 return (
     <div className='container uploadScreen'>
        <div className="row justify-content-center">
          <div className='col-4'>
            <Textfield type="text" className='mb-3 songName' id="songName" label="Song Name" variant="outlined"/>
            <Textfield type="text" className='artistName' id="artistName" label="Artist Name" variant="outlined"/>
          </div>
          
          <div className='col-4'>
            <input type="file" onChange={handleChange} accept="audio/*" id="fileinput" hidden/>
            <label for="fileinput" className='fileLable'>Choose File</label>
            <Button variant="contained" className=" " onClick={handleUpload}>Upload</Button>
            <p>{percent}% done</p>
          </div>
        </div>
     </div>
 );
}

export default App;
