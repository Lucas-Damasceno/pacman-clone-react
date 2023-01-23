import { Tiles } from "../../enums/tiles.enum";

type valueof<T> = T[keyof T]
type PossibleTiles = valueof<Tiles>;

export default PossibleTiles