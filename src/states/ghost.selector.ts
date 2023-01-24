import { selectorFamily } from 'recoil';
import { PossibleGhostState } from '../types/possibleGhostState';
import { Ghost1State, Ghost2State, Ghost3State, Ghost4State } from './ghosts.state';

const GhostSelector = selectorFamily({
  key: 'GhostSelector',
  get: (ghostState: PossibleGhostState) => ({get}) => {
   const dictionary = {
    'ghost1': Ghost1State,
    'ghost2': Ghost2State,
    'ghost3': Ghost3State,
    'ghost4': Ghost4State,
   }

   return dictionary[ghostState]
  },
})

export default GhostSelector;