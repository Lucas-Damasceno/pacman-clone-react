import React, { ReactElement, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import config from "../../config/config";
import { Tiles } from "../../enums/tiles.enum";
import GameTickState from "../../states/gameTick.state";
import { AllGhostStates, GhostStateType } from "../../states/ghosts.state";
import MazeState, { MazeStateType } from "../../states/maze.state";
import PacManState, { PacManStateType } from "../../states/pacMan.state";
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
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const pacManState = useRecoilValue(PacManState);
  const allGhostStates = useRecoilValue(AllGhostStates);

  const createMazeState = (mazeState: MazeStateType[][], pacManState: PacManStateType, ghostStates: GhostStateType[]) => {
    const newMazeState = mazeState.map(row => {
      return row.map(item => {
        const newState: MazeStateType = {
          characters: [],
          isPoint: item.isPoint,
          isPower: item.isPower,
          originalTile: item.originalTile
        }

        return newState
      })
    });

    ghostStates.forEach(ghostState => {
      const ghostX = Math.floor(ghostState.x);
      const ghostY = Math.floor(ghostState.y);
      newMazeState[ghostY]?.[ghostX].characters.push(ghostState.codename);
    })

    const pacmanX = Math.floor(pacManState.x);
    const pacmanY = Math.floor(pacManState.y);
    const pacManTile = newMazeState[pacmanY]?.[pacmanX];
    pacManTile.characters.push('pacman');
    pacManTile.isPoint = false;

    return newMazeState
  }

  useEffect(function gameTick() {
    const timeOutSpeed = 1;
    const timer = setInterval(() => {
      const timeNow = new Date().getTime();
      if ((lastTime + (config.pacmanSpeed * 1000)) < timeNow) {
        setLastTime(timeNow);
        setGameTick(timeNow);
      }
    }, timeOutSpeed)
    return () => clearInterval(timer)
  }, [gameTick, lastTime]);

  useEffect(function setNewMazeState() {
    setMazeState(createMazeState(mazeState, pacManState, allGhostStates));
  }, [pacManState])

  useEffect(function setTilePointToHidden() {
    mazeState.forEach((row, y) => {
      row.forEach((tile, x) => {
        if(
          tile.originalTile === Tiles.point && tile.isPoint === false ||
          tile.originalTile === Tiles.power && tile.isPower === false
        ){
          document.documentElement.style.setProperty(`${config.pointCssVar}X${x}Y${y}`, '0');
        }
      })
    })

  }, [mazeState])

  return <></>
}

export default GameTick