import React from "react";
import { useState } from "react";

import classes from "../css/Register.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [verPass, setVerPass] = useState("");

    async function Register(){
        if (username === "" || password === "" || verPass === "" || email === ""){
            alert("Please fill out all fields");
        }

        const response = await fetch('https://localhost:7023/Credentials/Register?' + new URLSearchParams(
            {username: username, password: password, email: email, verPass: verPass}), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'});
        if (response.ok) {
            window.location.href = "http://localhost:3000/Login";
        }
        else{
            alert("Invalid credentials:" + response.status);
        }
    }

  return (
    <div class="row justify-content-center mt-5">
    <div class="col-md-6">
    <div class="card">
        <div class="form-row">
            <div class="col form-group">
                <label>Username</label>   
                    <input type="text" class="form-control" name="username" placeholder="" onChange={e => setUsername(e.target.value)}/>
            </div>
            <div class="col form-group">
                <label>Email</label>
                    <input type="email" class="form-control" name="email" placeholder="" onChange={e => setEmail(e.target.value)}/>
            </div> 
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div class="form-group">
            <label>Verify Password</label>
            <input class="form-control" type="password" name="verPass" onChange={e => setVerPass(e.target.value)} />
        </div> 
        <div class="form-group">
            <button type="submit" id="submit" class="btn btn-primary btn-block" onClick={Register}> Register  </button>
        </div>                                         
        <div class="border-top card-body text-center">Have an account? <a href="/Login" id="loginLink">Log In</a></div>
        </div> 
        </div>
        </div>
    );
}

export default RegisterPage;