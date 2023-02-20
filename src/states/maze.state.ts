import { atom } from 'recoil'
import MazeMap from '../components/maze/mazeMap';
import { GhostNames } from './ghosts.state';

export type MazeStateType = {
  originalTile: string;
  characters: Array<GhostNames | 'pacman'>;
  isPoint: boolean;
  isPower: boolean;
};

const createInitialMazeState = () => {
  return MazeMap.mazeMapXY.map(row => {
    return row.map(tile => {
      return {
        originalTile: tile,
        characters: [],
        isPoint: tile === '.',
        isPower: tile === 'O',
      } as MazeStateType
    })
  })
}

const MazeState = atom<MazeStateType[][]>({
  key: 'MazeState', // unique ID (with respect to other atoms/selectors)
  default: createInitialMazeState()
});

export default MazeState