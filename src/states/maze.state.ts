import { atom } from 'recoil'
import PossibleTiles from '../types/possibleTiles';

export type MazeStateType = {
  status: PossibleTiles,
  point: boolean,
  power: boolean,
  originalTile: PossibleTiles,
}

const MazeState = atom<MazeStateType[]>({
  key: 'MazeState', // unique ID (with respect to other atoms/selectors)
  default: [],
});

export default MazeState