import { useState } from 'react';
import storage from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';

import classes from '../css/SongUpload.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SongUpload() {
 const [file, setFile] = useState(" ");
 const [percent, setPercent] = useState(0);

 function handleChange(event) {
     setFile(event.target.files[0]);
 }

 function postSong(songUrl){
  try{
    if (songUrl === " ") {
      throw new Error("No URL Found");
    }
    console.log("postSong");
    const response = fetch("https://localhost:7023/Song?" + new URLSearchParams({
      title: document.getElementById("songName").value,
      artist: document.getElementById("artistName").value,
      songLink: songUrl}), {method: "POST"});

      // if (!response.ok) {
      //   throw new Error  (`Error! status: ${response.status}`);
      // }

      alert("Upload successful");
      window.location.href = "http://localhost:3000/";
  }
  catch(err){
    console.log(err);
  }
 }

 const handleUpload = () => {
     if (!file) {
        alert("Please upload an song first!");
        return;
     }
     if (document.getElementById("songName").value === ""){
        alert("Please enter a song name");
        return;
     }
     if (document.getElementById("artistName").value === ""){
        alert("Please enter an artist name");
        return;
     }

     const storageRef = ref(storage, `/files/${file.name}`);
     const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on(
         "state_changed",
         (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPercent(percent); 
         },
         (err) => alert(err),
         () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              postSong(url);
          });
         }
     );
    }

  return (
    <div className='container'>
        <div className={classes.uploadScreen}>
          <div className="row justify-content-center">
            <div className='col-4'>
              <Textfield type="text" className='Textfield mb-3 mr-3' id="songName" label="Song Name" variant="filled"S />
              <Textfield type="text" className='Textfield mr-3' id="artistName" label="Artist Name" variant="filled"/>
            </div>
            
            <div className='col-4'>
              <input type="file" onChange={handleChange} accept="audio/*" id="fileinput" hidden/>
              <label for="fileinput" className={classes.fileLable}>Choose File</label> <br/>
              <Button variant="contained" className="mt-1" onClick={handleUpload}>Upload</Button>
              <p>{percent}% done</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default SongUpload;