import { atom } from 'recoil';

export const playlistState = atom({
  key: 'playlistState',
  default: null,
});

export const playlistIdState = atom({
  key: 'playlistIdState',
  // fetch playlists in order to set default to dynamic value or null
  default: '37i9dQZF1DZ06evO0nT692',
});
