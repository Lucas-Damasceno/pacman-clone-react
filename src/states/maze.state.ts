import { atom } from 'recoil'
import PossibleTiles from '../components/types/possibleTiles';

export type MazeStateType = {
  status: PossibleTiles,
  point: boolean,
  power: boolean,
}

const MazeState = atom<MazeStateType[]>({
  key: 'MazeState', // unique ID (with respect to other atoms/selectors)
  default: [],
});

export default MazeState