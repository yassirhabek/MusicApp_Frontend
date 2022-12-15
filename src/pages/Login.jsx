import React from "react";
import { useState } from "react";
import "../css/Login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
function LoginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function Login(){
    const response = await fetch('https://localhost:7023/Credentials/Login?' + new URLSearchParams(
      {username: username, password: password}), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      withCredentials: true});
    if (response.ok) {
      window.location.href = "http://localhost:3000/";
    }
    else{
      alert("Invalid credentials:" + response.status);
    }
  }

  return (
    <div class="cotainer">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">Username</label>
                                <div class="col-md-6">
                                    <input type="text" id="username" class="form-control" name="username" required autofocus onChange={e => setUsername(e.target.value)} />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input type="password" id="password" class="form-control" name="password" required onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div class="col-md-6 offset-md-4">
                                <button class="btn btn-primary" id="submit" onClick={Login}>
                                    Login
                                </button>
                                <a href="/Register" id="registerLink" class="btn btn-link">
                                    Register
                                </a>
                            </div>
              </div>
            </div>
        </div>
    </div>
    </div>

  );
}

export default LoginPage;
