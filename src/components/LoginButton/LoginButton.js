// LoginButton.js
import React from "react";
import { AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, SCOPES_URL_PARAM, RESPONSE_TYPE } from "../../config";

const LoginButton = () => {
  const login = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES_URL_PARAM}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  return <button className="my-button" onClick={login}>Login to Spotify</button>;
};

export default LoginButton;
