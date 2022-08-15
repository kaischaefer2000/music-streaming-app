import React from 'react';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';
import { useRecoilState } from 'recoil';
import { isPlayingState, currentTrackIdState } from '../atoms/songAtom';
import Image from 'next/image';

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    // tell spotify which song to play
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
      onClick={() => playSong()}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <div>
          <Image
            width="40px"
            height="40px"
            className="h-10 w-10"
            src={track.track?.album.images[0].url}
            alt=""
          />
        </div>
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="intems-center ml-auto flex justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
