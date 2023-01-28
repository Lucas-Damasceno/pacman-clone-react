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
`

const GhostMovingKeyframe = (p: PropsStyled) => keyframes`
  0%{background-position: center;}
	100%{background-position: left;}
`

const GhostBody = styled.div<PropsStyled>`
  background-color: ${p => p.color};
  height: 32px;
  width: 28px;
  place-self: center;
  transition: transform linear ${config.pacmanSpeed}s;
  border-radius: 12px 12px 0 0px ;
  position: relative;
  margin-top: 8px;

  &::after{
    content: " ";
    background: linear-gradient(-45deg, #282C34 5px,transparent 0),linear-gradient(45deg, #282C34 5px,transparent 0);
    background-position: center;
    background-repeat: repeat-x;
    background-size: 9px;
    animation: ${GhostMovingKeyframe} ${p => p.runningSpeed}s linear infinite;
    display: block;
    width: 100%;
    height: 9px;
    rotate: 180deg;
    position: absolute;
    bottom: -5px;
    left: 0;
    top: 24px;
    transform: rotate(180deg);
  }
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
      </GhostBody>
    </GhostWrapper>
  )
}

export default React.memo(Ghost)