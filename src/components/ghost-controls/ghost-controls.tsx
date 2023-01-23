import React, { ReactElement, useEffect } from "react";
import Directions from "../types/directions";
import { GhostKey } from "../types/ghostKey";
import { useRecoilState } from 'recoil';
import Ghost1State from "../../states/ghosts.state";
import Ghost2State from "../../states/ghosts.state";
import Ghost3State from "../../states/ghosts.state";
import Ghost4State from "../../states/ghosts.state";
import MazeState from "../../states/maze.state";


function GhostControls(): ReactElement{
  const [ghost1, setGhost1] = useRecoilState(Ghost1State);
  const [ghost2, setGhost2] = useRecoilState(Ghost2State);
  const [ghost3, setGhost3] = useRecoilState(Ghost3State);
  const [ghost4, setGhost4] = useRecoilState(Ghost4State);

  const [mazeState, setMazeState] = useRecoilState(MazeState);

  const moveGhost = (ghost: GhostKey, direction: Directions) => {
    const ghostSetState = {
      ghost1: setGhost1,
      ghost2: setGhost2,
      ghost3: setGhost3,
      ghost4: setGhost4
    }
  }

  useEffect(() => {
    
  }, [mazeState])

  return <></>
}

export default GhostControls