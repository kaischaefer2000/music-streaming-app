import { atom } from 'recoil';

export const playlistState = atom({
  key: 'playlistState',
  default: null,
});

export const playlistIdState = atom({
  key: 'playlistIdState',
  // TODO: fetch playlists in order to set default to dynamic value or null
  default: '37i9dQZF1EUMDoJuT8yJsl',
});
