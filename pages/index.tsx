//@ts-ignore
import SpotifyWebApi from 'spotify-web-api-node';
import type { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
import { getSession, signIn } from 'next-auth/react';
import Player from '../components/Player';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';

// @ts-ignore
const Home: NextPage = ({ playlists, initialPlaylistData }) => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Music Streaming App</title>
      </Head>
      <main className="flex">
        <Sidebar playlists={playlists} />
        <Center initialPlaylistData={initialPlaylistData} />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

// This gets executed on the inital render of the page
Home.getInitialProps = async (context: any) => {
  // Get session data, to check if the request is authorized
  const session = await getSession(context);

  // Initializing spotify API with credentials
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  });

  // Set access token if user is logged in
  if (session) {
    if (session.error === 'RefreshAccessTokenError') {
      signIn();
    }
    //@ts-ignore
    spotifyApi.setAccessToken(session?.user?.accessToken);
  }

  // Fetch playlist names in order to render them in the sidebar
  const getPlaylists = async () => {
    if (session) {
      return spotifyApi.getUserPlaylists().then((data: any) => {
        return data.body.items;
      });
    } else {
      return [];
    }
  };
  const playlists = await getPlaylists();

  // Get the data of the initial playlist
  const getInitialPlaylistData = async () => {
    return spotifyApi
      .getPlaylist('37i9dQZF1DZ06evO0nT692')
      .then((data: any) => {
        return data.body;
      })
      .catch((err: any) => console.log(err));
  };
  const initialPlaylistData = await getInitialPlaylistData();

  return {
    session,
    playlists,
    initialPlaylistData,
  };
};
