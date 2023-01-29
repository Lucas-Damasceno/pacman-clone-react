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
  height: ${config.tileSizeInPx * 1.6}px;
  width: ${config.tileSizeInPx * 1.4}px;
  position: absolute;
  place-self: center;
  transition: translate linear ${config.pacmanSpeed}s;
  border-radius: ${config.tileSizeInPx * 1.2}px ${config.tileSizeInPx * 1.2}px 0 0px ;
  /* scale: 1; */
  display: flex;
  
  align-items: center;
  justify-content: space-around;
  padding-bottom:  ${config.tileSizeInPx / 4}px;
  box-sizing: border-box;
`

const GhostEyes = styled.div`
  width: ${config.tileSizeInPx / 2}px;
  height: ${config.tileSizeInPx / 2}px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;  
  justify-content: center;
  align-items: center;
  
  &.up{
    justify-content: center;
    align-items: flex-start;
  }

  &.down{
    justify-content: center;
    align-items: flex-end;
  }

  &.left{
    justify-content: left;
    align-items: center;
  }

  &.right{
    justify-content: right;
    align-items: center;
  }
`

const GhostPupils = styled.div`
  width: ${config.tileSizeInPx / 4}px;
  height: ${config.tileSizeInPx / 4}px;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
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

  const ghostStyle: React.CSSProperties = {
    translate: `${ghostState.positionX}px ${ghostState.positionY}px`,
  }

  const ghostColor = {
    '1': '#FF0000',
    '2': '#00ffff',
    '3': '#ffb8ff',
    '4': '#ffb851',
  };

  const runningSpeed = ghostState.moving ? 0.6 : 0;

  return (
    <GhostWrapper>
      <GhostBody runningSpeed={runningSpeed} color={ghostColor[props.type]} style={ghostStyle}>
        <GhostEyes className={ghostState.direction}>
          <GhostPupils/>
        </GhostEyes>
        <GhostEyes className={ghostState.direction}>
          <GhostPupils/>
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