import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const likesState = atom({
  key: 'likesState',
  default: [],
});
