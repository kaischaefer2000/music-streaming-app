import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  // fetch song information of current selected song from spotify
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              // pass access token in order to be authorized to fetch the song info
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          },
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [spotifyApi, currentIdTrack]);

  return songInfo;
}

export default useSongInfo;
