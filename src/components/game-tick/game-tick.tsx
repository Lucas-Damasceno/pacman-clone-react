import React, { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import config from "../../config/config";
import GameTickState from "../../states/gameTick.state";
import Directions from "../../types/directions";

/* Refatorar depois */
const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];

type HorizontalDirections = 'right' | 'left';

type ChoosedDirection = {
  use: 'newDirection' | 'direction',
  direction: Directions,
  canMove: boolean,
}


function GameTick(): ReactElement {
  const [lastTime, setLastTime] = useState(0);
  const [gameTick, setGameTick] = useRecoilState(GameTickState);

  useEffect(function gameTick() {
    const timeOutSpeed = 1;
    const timer = setInterval(() => {
      const timeNow = new Date().getTime();
      if ((lastTime + (config.pacmanSpeed * 1000)) < timeNow) {
        setLastTime(timeNow);
        setGameTick(timeNow);
        console.log('rodando')
      }
    }, timeOutSpeed)
    return () => clearInterval(timer)
  }, [gameTick, lastTime]);

  return <></>
}

export default GameTick