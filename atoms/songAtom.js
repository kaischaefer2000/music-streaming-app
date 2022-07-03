import { atom } from 'recoil';

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  dafault: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
