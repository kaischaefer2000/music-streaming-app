import { LogoutIcon} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState} from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs'
import { signOut } from 'next-auth/react';

const colors = [
  'from-indigo-500',
  'from-green-500',
  'from-purple-500',
  'from-red-500',
  'from-yellow-500',
  'from-blue-500',
  'from-pink-500',
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  // set background color to a random color, when switching the playlist
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  // get playlist data
  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
        setPlaylist(data.body)
    }).catch((err) => console.log(err))
  }, [spotifyApi, playlistId])

  return (
    // the Center component takes as much space as possible for itself
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-3 rounded-full bg-black p-1 pr-3 text-white opacity-90">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <LogoutIcon
            className="cursor-pointer h-4 w-4 hover:opacity-80"
            onClick={() => signOut()}
          />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white `}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images[0]?.url}
          alt="Playlist cover"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
