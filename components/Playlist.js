import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs';

const colors = [
  'from-indigo-500',
  'from-green-500',
  'from-purple-500',
  'from-red-500',
  'from-yellow-500',
  'from-blue-500',
  'from-pink-500',
];

function Playlist() {
  const [color, setColor] = useState(null);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);

  // set background color to a random color, when switching the playlist
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

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
    </React.Fragment>
  );
}

export default Playlist