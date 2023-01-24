import React, { ReactElement, useEffect } from "react";
import Directions from "../../types/directions";
import { useRecoilState } from 'recoil';
import Ghost1State from "../../states/ghosts.state";
import Ghost2State from "../../states/ghosts.state";
import Ghost3State from "../../states/ghosts.state";
import Ghost4State from "../../states/ghosts.state";
import { PossibleGhostState } from "../../types/possibleGhostState";
import config from "../../config/config";

function GhostControls(): ReactElement {
  const [ghost1, setGhost1] = useRecoilState(Ghost1State);
  const [ghost2, setGhost2] = useRecoilState(Ghost2State);
  const [ghost3, setGhost3] = useRecoilState(Ghost3State);
  const [ghost4, setGhost4] = useRecoilState(Ghost4State);

  const canMoveGhost = (direction: Directions, index: number) => {

  }

  const moveGhost = (ghost: PossibleGhostState, direction: Directions) => {
    const ghostState = {
      ghost1,
      ghost2,
      ghost3,
      ghost4
    }

    const ghostSetState = {
      ghost1: setGhost1,
      ghost2: setGhost2,
      ghost3: setGhost3,
      ghost4: setGhost4
    }

    const selectedGhost = ghostSetState[ghost];

    console.log(ghostState[ghost])

  }

  function randomDirection(): Directions {
    const possibleDirections: Directions[] = ['up', 'down', 'left', 'right'];
    return possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
  }

  let timer: any;
  const interval = () => {
    timer = !timer && setInterval(() => {
      
    }, config.pacmanSpeed)
  }

  useEffect(() => {
    const timeOutSpeed = config.pacmanSpeed * 1000;
    //Cada ghost vai ter uma função diferente para determinar seu movimento
    const ghost1Direction = randomDirection();
    const ghost2Direction = randomDirection();
    const ghost3Direction = randomDirection();
    const ghost4Direction = randomDirection();

    const timer = setTimeout(() => {
      moveGhost('ghost1', ghost1Direction);
    }, timeOutSpeed)

    return () => {
      clearTimeout(timer);
    }

  }, [])

  return <></>
}

export default GhostControls