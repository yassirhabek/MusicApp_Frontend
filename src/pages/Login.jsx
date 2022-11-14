import React from "react";
import { Button } from "@mui/material";

import classes from "../css/Login.module.css";


const DashboardLoginLightTheme = () => {
  return (
    <div className={classes.container}>
        <h2>Login</h2>
        <h3>Enter your credentials</h3>
        <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot Password?</a>
            <Button variant="contained" color="primary">Login</Button>
        </form>
    </div>
  );
};

export default DashboardLoginLightTheme;
