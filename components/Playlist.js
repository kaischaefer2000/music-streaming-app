import React, { useEffect } from 'react';
import { playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import SpotifyWebApi from 'spotify-web-api-node';
import Songs from '../components/Songs';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function Playlist({ initialPlaylistData }) {
  const [playlist, setPlaylist] = React.useState(initialPlaylistData);
  const playlistId = useRecoilValue(playlistIdState);
  const { data: session } = useSession();

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  });

  //set Access Token
  if (session) {
    if (session.error === 'RefreshAccessTokenError') {
      signIn();
    }
    spotifyApi.setAccessToken(session?.user?.accessToken);
  }

  // get playlist data
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi, playlistId]);

  return (
    <React.Fragment>
      <section
        className={`flex h-72 items-end space-x-7 bg-gradient-to-b from-red-500 to-black p-8 text-white `}
      >
        {playlist?.images[0]?.url && (
          <Image
            width="176px"
            height="176px"
            src={playlist?.images[0]?.url}
            alt="Playlist cover"
            className="shadow-2xl"
          />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs playlist={playlist} />
      </div>
    </React.Fragment>
  );
}

export default Playlist