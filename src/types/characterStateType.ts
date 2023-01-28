import { CharacterType } from "./characterType";
import Directions from "./directions";
import { CharacterChar } from "./possibleTiles";

export type CharacterStateType = {
  direction: Directions;
  nextDirection: Directions | null;
  positionX: number;
  positionY: number;
  index: number;
  teleporting: boolean;
  moving: boolean;
  type: CharacterType;
  identification: CharacterChar;
  color?: 'blue' | undefined;
  powered: boolean;
  poweredForManyTicks: number; 
}
