import { useSession } from 'next-auth/react';
import React from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import { isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo'

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  // const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = React.useState(50);

  const songInfo = useSongInfo()

  return (
    <div>
      {/* Left */}
      <div>
        {/* <img src={songInfo?.album.images?.[0]?.url} alt="" /> */}
      </div>
    </div>
  );
}

export default Player;
