import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

// all this is rendered on the server

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    // send a request to the apotify Api with the access and refresh token in order to refresh the access token
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken(); 

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = one our, because expires_in is 3600
      // the initial refresh token is valid unless the spotify Api sends a new refresh token
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // configure spotify provider with credentials from spotify developers account
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,

      // the login process will be initiated by sending the user to this URL.
      authorization: LOGIN_URL,
    }),
  ],

  // a random string used to hash tokens
  secret: process.env.JWT_SECRET,

  // specify page for custom log in
  pages: {
    signIn: '/login',
  },
  callbacks: {
  
    // this callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). Its content is forwarded to the session callback, where you can control what should be returned to the client. Anything else will be kept from your front-end.
    async jwt({ token, account, user }) {
      
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // return previous token if the access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // refresh access token, if it has expired
      return await refreshAccessToken(token);
    },

    // allocate the necessary token information to the user in a session.
    // tokens are http only in order to be hidden. The client JavaScript cant read the it.
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
