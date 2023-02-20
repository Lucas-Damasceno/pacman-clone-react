import React, { ReactElement, useEffect } from "react";
import styled, {Keyframes, keyframes} from "styled-components";
import { useRecoilState, useRecoilValue } from 'recoil';
import config from "../../config/config";
import PacManState, { PacManStateType } from "../../states/pacMan.state";
import GameTickState from "../../states/gameTick.state";
import { canMove, getNewPositionXY, TELEPORT_POSITIONS } from "../../utils/utils";
import GameStart from "../../states/gameStart.state";
import MazeState from "../../states/maze.state";
import Directions from "../../types/directions";
import { IndexObject } from "../../types/indexObject";
import { Tiles } from "../../enums/tiles.enum";

const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];

interface PacManMouthAnimation{
  moving: boolean;
}

interface PacmanCharacterProps{
  transitionTime: number;
  // moving: boolean;
  animation: Keyframes | undefined;
}

const PacmanWrapper = styled.div`
  z-index: 4;
  position: absolute;
  width: ${config.tileSizeInPx}px;
  height: ${config.tileSizeInPx}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PacManCharacter = styled.div<PacmanCharacterProps>`
  width: ${config.tileSizeInPx}px;
  height: ${config.tileSizeInPx}px;
  transition: translate linear ${p => p.transitionTime}s;
  /* overflow: hidden; */
  background-color: yellow;
  border-radius: 50%;
  scale: 1.5;
  display: flex;
  align-items: center;

  animation: ${prop => prop.animation} .2s linear infinite;
  clip-path: polygon(0 0, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 60% 50%);
`;

const PacManMouthAnimation = keyframes`
  0%{
    clip-path: polygon(0 0, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 60% 50%);
  }
  50%{
    clip-path: polygon(0 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 60% 50%);
  }
`

const PacManDeathAnimation = keyframes`
  0%{
    clip-path: polygon(0 0, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 60% 50%);
  }
  50%{
    clip-path: polygon(0 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 60% 50%);
  }
`

function PacMan(): ReactElement {
  const [pacManState, setPacManState] = useRecoilState(PacManState);
  const gameStart = useRecoilValue(GameStart);
  const mazeState = useRecoilValue(MazeState)
  const gameTickState = useRecoilValue(GameTickState)

  const pacManDirectionStyle = {
    up: '90deg',
    down: '-90deg',
    left: '0deg',
    right: '180deg',
  }

  const pacmanX = pacManState.x * config.tileSizeInPx;
  const pacmanY = pacManState.y * config.tileSizeInPx;

  const pacmanStyle: React.CSSProperties = {
    translate: `${pacmanX}px ${pacmanY}px`,
    rotate: pacManDirectionStyle[pacManState.direction],
    color: 'blue'
  }

  const transitionTime = pacManState.teleporting ? 0 : config.pacmanSpeed;
  let animation = pacManState.moving ? PacManMouthAnimation : undefined;

  const createNewPacManState = (pacmanState: PacManStateType) => {
    let newPosition: [number, number] = [pacManState.x, pacManState.y];
    const _canMove = canMove(pacManState);
    
    const canMoveToNextDirection = _canMove[pacManState.nextDirection];
    const canMoveDirection = _canMove[pacManState.direction];

    if(canMoveToNextDirection){
      newPosition = getNewPositionXY(pacManState.position, pacManState.nextDirection);
    }else if(canMoveDirection){
      newPosition = getNewPositionXY(pacManState.position, pacManState.direction);
    }

    const moving = canMoveToNextDirection || canMoveDirection;

    //É usado Math.floor pois o estado inicial é um número quebrado ex: 13.5 
    //Refatorar o sistema desse número quebrado
    newPosition = [Math.floor(newPosition[0]), Math.floor(newPosition[1])]

    const newPacManState: PacManStateType = {
      ...pacmanState,
      x: newPosition[0],
      y: newPosition[1],
      position: newPosition,
      moving: moving
    }
    
    if(canMoveToNextDirection){
      newPacManState.direction = newPacManState.nextDirection;
    }

    //mazeState pacmanpositionY, pacmanPositionX
    const pacmanNextTile = mazeState[newPosition[1]]?.[newPosition[0]];
    if(pacmanNextTile.isPower){
      newPacManState.powered = true;
      newPacManState.poweredCountdown = config.maximumTimePoweredInTicks;
    }
    
    if(newPacManState.powered){
      newPacManState.poweredCountdown--;
    }

    const teleporting = pacmanNextTile.originalTile === Tiles.teleportLeft || pacmanNextTile.originalTile === Tiles.teleportRight;
    newPacManState.teleporting = teleporting;

    if(teleporting){
      debugger
      //Teleporta da esquerda pra direita e vice versa
      const teleportDirection = pacmanNextTile.originalTile === Tiles.teleportRight ? 'left' : 'right';
      const teleportXY = TELEPORT_POSITIONS[teleportDirection];

      newPacManState.x = teleportXY[0];
      newPacManState.y = teleportXY[1];
      newPacManState.position = teleportXY;
    }

    newPacManState.powered = newPacManState.poweredCountdown > 0;

    return newPacManState
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    /*Checagem se a tecla apertada é valida */
    const invalidKey = !validButtons.includes(event.key as any);
    if (invalidKey) return;

    const keyPressed = event.key as ValidButtons;

    const keyPressedToDirection: IndexObject<ValidButtons, Directions> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }
    const nextDirection: Directions = keyPressedToDirection[keyPressed];

    setPacManState({
      ...pacManState,
      nextDirection: nextDirection
    })
  }

  useEffect(() => {
    if(gameStart){
      const newPacmanState = createNewPacManState(pacManState);
      setPacManState(newPacmanState);
    }
  }, [gameTickState])

  useEffect(function addEventListenerKeyDown() {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return(
    <PacmanWrapper>
      <PacManCharacter animation={animation} transitionTime={transitionTime} style={pacmanStyle}>
      </PacManCharacter>
    </PacmanWrapper>
  )
}

export default React.memo(PacMan);