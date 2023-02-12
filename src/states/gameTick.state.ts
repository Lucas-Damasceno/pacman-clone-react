import { atom } from 'recoil'

const GameTickState = atom<number>({
  key: 'GameTickState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export default GameTickState