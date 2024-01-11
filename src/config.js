export const CLIENT_ID = "a8f0bd6bcf8b44fa9736810f3b9020f2";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const REDIRECT_URI = "https://top-tunes-self.vercel.app/";

export const SCOPE = [
  "playlist-modify-private",
  "playlist-modify-public",
  "user-library-modify",
  "user-top-read",
];

export const SCOPES_URL_PARAM = SCOPE.join("%20");
export const RESPONSE_TYPE = "token";
