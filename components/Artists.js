import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Artist from './Artist';

function Artists() {
  const spotifyApi = useSpotify();
  const [artists, setArtists] = useState([]);
  // Fetch followed artists from Spotify API
  useEffect(() => {
    const fetchArtists = async () => {
      const artistsData = await fetch(
        `https://api.spotify.com/v1/me/following?type=artist`,
        {
          headers: {
            // Pass access token in order to be authorized to fetch the artists
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        },
      ).then((res) => res.json());
      setArtists(artistsData.artists.items);
    };
    fetchArtists();
  }, [spotifyApi]);

  return (
    <React.Fragment>
      <section
        className={`h-50 flex items-end space-x-7 bg-gradient-to-b from-purple-800 to-black p-8 text-white `}
      >
        <h1 className="bold text-lg md:text-xl xl:text-3xl">Artists</h1>
      </section>
      <div className="flex flex-wrap p-4 pb-28 text-white ">
        {artists.map((artist) => (
          <Artist key={artist.id} name={artist.name} images={artist.images} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Artists;
