import { atom, RecoilState, selectorFamily } from 'recoil'
import Directions from '../types/directions';
import { IndexObject } from '../types/indexObject';

export type GhostNames = 'clyde' | 'blinky' | 'pinky' | 'inky';

type GhostStateType = {
  x: number;
  y: number;
  moving: boolean;
  teleporting: boolean;
  feared: boolean;
  direction: Directions;
  nextDirection: Directions | undefined;
  position: [number, number];
  onlyEyes: boolean;
  readonly codename: GhostNames
}

const createGhostInitialValue = (ghostName: GhostNames, positionXY: number[], direction: Directions = 'up') => {
  return atom<GhostStateType>({
    key: `GhostState_${ghostName}`, // unique ID (with respect to other atoms/selectors)
    default: {
      x: 13.5,
      y: 15.5,
      moving: false,
      teleporting: false,
      direction: direction,
      nextDirection: undefined,
      position: [0,0],
      feared: false,
      onlyEyes: false,
      codename: ghostName,
    }
  })
}

const usedGhosts: GhostNames[] = ['clyde', 'blinky', 'pinky', 'inky'];

let ghostStates: IndexObject<GhostNames, RecoilState<GhostStateType>> = {
  blinky: createGhostInitialValue('blinky', [0,0]),
  clyde: createGhostInitialValue('clyde', [0,0]),
  inky: createGhostInitialValue('inky', [0,0]),
  pinky: createGhostInitialValue('pinky', [0,0]),
}

const GhostStateFamily = selectorFamily({
  key: 'MyMultipliedNumber',
  get: (ghostName: GhostNames) => ({get}) => {
    return get(ghostStates[ghostName]);
  },

  set: (ghostName: GhostNames) => ({set}, newValue) => {
    set(ghostStates[ghostName], newValue);
  },
})


export default GhostStateFamily