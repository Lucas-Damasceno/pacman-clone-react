import { atom } from 'recoil'
import Directions from '../components/types/directions';

type GhostStateType = {
  direction: Directions;
  positionX: number;
  positionY: number;
  index: number;
}

export const Ghost1State = atom<GhostStateType>({
  key: 'ghost1State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    positionX: 0,
    positionY: 0,
    index: 0,
  }, // default value (aka initial value)
});

export const Ghost2State = atom<GhostStateType>({
  key: 'ghost2State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    positionX: 0,
    positionY: 0,
    index: 0,
  }, // default value (aka initial value)
});

export const Ghost3State = atom<GhostStateType>({
  key: 'ghost3State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    positionX: 0,
    positionY: 0,
    index: 0,
  }, // default value (aka initial value)
});

export const Ghost4State = atom<GhostStateType>({
  key: 'ghost4State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    positionX: 0,
    positionY: 0,
    index: 0,
  }, // default value (aka initial value)
});


export default Ghost1State