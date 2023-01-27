import { Tiles } from "../enums/tiles.enum";

type ValueOf<T> = T[keyof T];

type PossibleTiles = ValueOf<typeof Tiles>;

//REFATORAR esse tipo precisar ter ligação com o de cima
export type CharacterChar = | 'P' | '1' | '2' | '3' | '4';

export default PossibleTiles