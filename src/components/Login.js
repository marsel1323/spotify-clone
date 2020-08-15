import React from "react";
import "./Login.css";
import { accessUrl } from "../utils/spotify";

function Login() {
  return (
    <div className="login">
      <img
        src="https://www.wycliffe.org/Photos/MiscPages/women/img/logo-spotify.png"
        alt="Spotify Logo"
      />
      <a href={accessUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
}

export default Login;
