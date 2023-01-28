import React, { ReactElement } from "react";
import styled, { keyframes } from "styled-components";
import { useRecoilState, useRecoilValue } from 'recoil';
import config from "../../config/config";
import FullMazeState from "../../states/fullMaze.state";
import { CharacterStateType } from "../../types/characterStateType";
import { IndexObject } from "../../types/indexObject";
import Directions from "../../types/directions";

type PropsStyled = {
  color: string,
  runningSpeed: number,
}

const GhostWrapper = styled.div`
  position: absolute;
  width: ${config.tileSizeInPx}px;
  height: ${config.tileSizeInPx}px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`

const GhostMovingKeyframe = (p: {runningSpeed: number}) => keyframes`
  0%{left: -2px}
	100%{left: -9px}
`

const GhostBody = styled.div<PropsStyled>`
  background-color: ${p => p.color};
  height: 32px;
  width: 28px;
  place-self: center;
  transition: transform linear ${config.pacmanSpeed}s;
  border-radius: 12px 12px 0 0px ;
  position: relative;
`

const GhostEyes = styled.div`
  //Left Eye
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 9px;
  left: 4px;

  //Right Eye
  &::before{
    display: block;
    content: '';
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 0px;
    left: 12px;
  }
`

const GhostPupils = styled.div`
  //Left Pupil
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: black;
  position: absolute;
  top: 3px;
  left: 3px;

  //Right Pupil
  &::after{
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 10px;
  }

  &.down{
    top: 4px;
  } 

  &.left{
    left: 0;
    &::after{
      left: 12px;
    }
  }

  &.right{
    left: 5px;
    &::after{
      left: 11px;
    }
  };

  &.up {
    top: 0
  }
`

const GhostBottom = styled.div`
  position: absolute;
  bottom: -4px;
  height: 8px;
  width: 100%;
  overflow: hidden;
  
  .running-container{
    animation: ${GhostMovingKeyframe} ${p => p.runningSpeed}s linear infinite;
    display: flex;
    position: absolute;
    left: -2px;

    div{
      width: 0; 
      height: 0; 
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid #282C34;
    }
  }
`

type Props = {
  type: '1' | '2' | '3' | '4';
}

function Ghost(props: Props): ReactElement {
  const [fullMazeState, setFullMazeState] = useRecoilState(FullMazeState);
  const ghostState = fullMazeState.charactersState.find(character => character.identification === props.type) as CharacterStateType;
  
  const pupilsIndexObject: IndexObject<Directions, any> = {
    down: {top: '4px'},
    left: {left: '0', '&::after': {left: '12px'}},
    right: {left: '5px', '&::after': {left: '11px'}},
    up: {top: '0'}
  }  

  const pupilsStyle = pupilsIndexObject[ghostState.direction];

  const ghostStyle: React.CSSProperties = {
    transform: `translateX(${ghostState.positionX}px) translateY(${ghostState.positionY}px)`
  }

  const ghostColor = {
    '1': '#F70000',
    '2': '#F7B2F7',
    '3': '#FFB851',
    '4': '#009999',
  };

  const runningSpeed = ghostState.moving ? 0.6 : 0;

  return (
    <GhostWrapper>
      <GhostBody runningSpeed={runningSpeed} color={ghostColor[props.type]} style={ghostStyle}>
        <GhostEyes>
          <GhostPupils className={ghostState.direction}/>
        </GhostEyes>
        <GhostBottom runningSpeed={runningSpeed}>
          <div className="running-container">
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
          </div>
        </GhostBottom>
      </GhostBody>
    </GhostWrapper>
  )
}

export default React.memo(Ghost)