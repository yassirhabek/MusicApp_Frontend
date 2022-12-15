import React from "react";
import { json, Link, useLocation } from "react-router-dom";
import LogoutIcon from "../icons/logout.svg";

import "../css/Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
    const location = useLocation();

    function Logout(){
        const response = fetch('https://localhost:7023/Credentials/Logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            withCredentials: true});
        if (response.status === undefined) {
            window.location.href = "http://localhost:3000/Login";
        }
        else{
            console.log("Logout failed:" + JSON.stringify(response));
            alert("Server Error: HTTP Status Code " + response.status);
        }
    }

    if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/Login" || location.pathname === "/Register") {
        return(
            <div></div>
        );
    }
    else{
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link class="nav-link active" aria-current="page" to="/SongUpload">Song Upload</Link>
                        <Link class="nav-link active" aria-current="page" to="/Chatroom">Chatroom</Link>
                    </div>

                    <div class="logout-button" id="logoutButton" onClick={Logout}>
                        <img src={LogoutIcon} />
                    </div>

                    </div>
                </div>
            </nav>  
        );
    }
}

export default Navbar;