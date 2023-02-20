import { atom, RecoilState, selectorFamily } from 'recoil'
import Directions from '../types/directions';
import { IndexObject } from '../types/indexObject';

export type GhostNames = 'clyde' | 'blinky' | 'pinky' | 'inky';

export type GhostStateType = {
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

const createGhostInitialValue = (ghostName: GhostNames, positionXY: [number, number], direction: Directions = 'up') => {
  return atom<GhostStateType>({
    key: `GhostState_${ghostName}`, // unique ID (with respect to other atoms/selectors)
    default: {
      x: positionXY[0],
      y: positionXY[1],
      moving: false,
      teleporting: false,
      direction: direction,
      nextDirection: undefined,
      position: positionXY,
      feared: false,
      onlyEyes: false,
      codename: ghostName,
    }
  })
}

const usedGhosts: GhostNames[] = ['clyde', 'blinky', 'pinky', 'inky'];

let ghostStates: IndexObject<GhostNames, RecoilState<GhostStateType>> = {
  blinky: createGhostInitialValue('blinky', [13.5, 12]),
  clyde: createGhostInitialValue('clyde', [15.5, 15]),
  inky: createGhostInitialValue('inky', [11.5,15]),
  pinky: createGhostInitialValue('pinky', [13.5, 15]),
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