import { atom } from 'recoil'

const GameStart = atom<boolean>({
  key: 'GameStart', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default GameStart