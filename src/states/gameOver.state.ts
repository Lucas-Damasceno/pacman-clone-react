import { atom } from 'recoil'

const GameOver = atom<boolean>({
  key: 'GameOver', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default GameOver