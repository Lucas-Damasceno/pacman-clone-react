import { CharacterType } from "./characterType";
import Directions from "./directions";

export type CharacterStateType = {
  direction: Directions;
  nextDirection: Directions | null;
  positionX: number;
  positionY: number;
  index: number;
  teleporting: boolean;
  moving: boolean;
  type: CharacterType;
  color?: string;
}
