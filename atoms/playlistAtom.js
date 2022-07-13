import { atom } from 'recoil';
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';

export const playlistState = atom({
  key: 'playlistState',
  default: null,
});

export const playlistIdState = atom({
  key: 'playlistIdState',
  // fetch playlists in order to set default to dynamic value or null
  default: '37i9dQZF1EUMDoJuT8yJsl',
});
