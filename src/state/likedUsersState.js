import { atom } from 'recoil';

export const likedUsersState = atom({
  key: 'likedUsersState',
  default: [], // array of user ids or objects
});
