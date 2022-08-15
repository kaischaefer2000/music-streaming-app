import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs';
import Image from 'next/image';

function Playlist() {
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);

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
        <Songs />
      </div>
    </React.Fragment>
  );
}

export default Playlist