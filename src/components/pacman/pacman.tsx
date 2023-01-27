import React, { ReactElement, useEffect, useState } from "react";
import styled, {Keyframes, keyframes} from "styled-components";
import PacmanState from "../../states/pacman.state";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import MazeState from "../../states/maze.state";
import { IndexObject } from "../../types/indexObject";
import Directions from "../../types/directions";
import MazeMap from "../maze/mazeMap";

const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];

interface PacManPartAnimation{
  top?: Keyframes;
  bottom?: Keyframes;
}

const PacmanWrapper = styled.div`
  position: absolute;
  width: ${config.tileSizeInPx}px;
  height: ${config.tileSizeInPx}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PacManCharacter = styled.div`
  width: 28px;
  height: 28px;
  transition: translate linear ${config.pacmanSpeed}s;
  overflow: hidden;
  /* background-color: yellow; */
  border-radius: 50%;
`;

const PacManTopAnimation = keyframes`
  0%{transform: rotate(35deg);}
	50%{transform: rotate(0deg);}
`

const PacManBottomAnimation = keyframes`
  0%{transform: rotate(-35deg);}
	50%{transform: rotate(0deg);}
`

const PacManTop = styled.div<PacManPartAnimation>`
  height: 18px;
  width: 40px;
  margin-left: -3px;
  margin-top: -4px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: yellow;
	transform: rotate(35deg);
  animation: ${prop => prop.top} .5s linear infinite;
`;

const PacManBottom = styled.div<PacManPartAnimation>`
  height: 18px;
  width: 40px;
  margin-left: -3px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: yellow;
	transform: rotate(-35deg);
  animation: ${prop => prop.bottom} .5s linear infinite;
`;

function PacMan(): ReactElement {
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  
  const pacManDirectionStyle = {
    up: '90deg',
    down: '-90deg',
    left: '0deg',
    right: '180deg',
  }

  const pacmanStyle: React.CSSProperties = {
    translate: `${pacmanState.positionX}px ${pacmanState.positionY}px`,
    rotate: pacManDirectionStyle[pacmanState.direction],
  }

  const animatedPacMan = {
    top: PacManTopAnimation,
    bottom: PacManBottomAnimation,
  }

  const stopedPacMan = {
    top: undefined,
    bottom: undefined
  }

  const selectedPacManAnimation = pacmanState.moving ? animatedPacMan : stopedPacMan;

  const handleKeyDown = (event: KeyboardEvent) => {
    const validButton = validButtons.includes(event.key as any)
    if(validButton === false) return

    const pressedButton = event.key as ValidButtons;

    const keyPressedToDirection: IndexObject<ValidButtons, Directions> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }

    setPacmanState(currentValue => {
      return {
        ...currentValue,
        nextDirection: keyPressedToDirection[pressedButton],
      }
    })

  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

  }, [mazeState])


  useEffect(function handlePacManMovement() {
    setPacmanState(currentPacmanState => {

      //REFATORAR DEPOIS
      const pacManNewPositionIndex = mazeState.findIndex(item => item.status === 'P');

      const currentPositionY = currentPacmanState.positionY;
      const currentPositionX = currentPacmanState.positionX;

      const newPositionY = Math.floor(pacManNewPositionIndex  / config.mazeColumns) * config.tileSizeInPx;
      const newPositionX = Math.floor(pacManNewPositionIndex % config.mazeColumns) * config.tileSizeInPx;

      let newDirection: Directions | undefined;

      console.log(currentPositionY, currentPositionX);
      console.log(newPositionY, newPositionX);

      const yEqual = currentPositionY === newPositionY;
      const xEqual = currentPositionX === newPositionX;

      if(yEqual && newPositionX < currentPositionX){
        newDirection = 'left'
      }

      if(yEqual && newPositionX > currentPositionX){
        newDirection = "right"
      }

      if(xEqual && newPositionY < currentPositionY){
        newDirection = 'up'
      }

      if(xEqual && newPositionY > currentPositionY){
        newDirection = "down"
      }

      if(newDirection === undefined){
        newDirection = currentPacmanState.direction;
      }
      
      // debugger

      return {
        ...currentPacmanState,
        positionY: newPositionY,
        positionX: newPositionX,
        index: pacManNewPositionIndex,
        moving: currentPacmanState.index !== pacManNewPositionIndex,
        direction: newDirection
      }
    })

  }, [mazeState])


  return(
    <PacmanWrapper>
      <PacManCharacter style={pacmanStyle}>
        <PacManTop top={selectedPacManAnimation.top}/>
        <PacManBottom bottom={selectedPacManAnimation.bottom}/>
      </PacManCharacter>
    </PacmanWrapper>
  )
}

export default React.memo(PacMan);