import React from "react";
import { Button } from "@mui/material";

import classes from "../css/Login.module.css";


const DashboardLoginLightTheme = () => {
  return (
    <div className={classes.dashboardLoginLightTheme}>
      <img className={classes.vectorsIcon} alt="" src="../vectors.svg" />
      <img
        className={classes.lightModeDarkMode}
        alt=""
        src="../light-mode--dark-mode.svg"
      />
      <form className={classes.form} action="Login" method="post">
        <div className={classes.sectionForgotDiv}>
          <div className={classes.forgotPasswordDiv}>Forgot password?</div>
          <div className={classes.rememberMeDiv}>Remember me</div>
          <div className={classes.rectangleDiv} />
        </div>
        <button className={classes.loginBtnButton}>
          <Button
            className={classes.rectangleButton}
            sx={{ width: 300 }}
            variant="contained"
            color="success"
            size="large">
            Login
          </Button>
          <div className={classes.loginDiv}>login</div>
        </button>
        <input
          className={classes.passwordInput}
          type="password"
          placeholder="Password"
        />
        <input
          className={classes.usernameInput}
          type="text"
          placeholder="Login"
        />
        <div className={classes.signInAndStartManagingYou}>
          Sign in and start managing your candidates!
        </div>
        <div className={classes.signInDiv}>Sign in</div>
      </form>
    </div>
  );
};

export default DashboardLoginLightTheme;
