import React, { ReactElement } from "react";
import styled, { keyframes } from "styled-components";
import { useRecoilState, useRecoilValue } from 'recoil';
import config from "../../config/config";
import FullMazeState from "../../states/fullMaze.state";
import { CharacterStateType } from "../../types/characterStateType";
import { IndexObject } from "../../types/indexObject";
import Directions from "../../types/directions";
import GhostMouth from "./ghostMouth";
import GameStart from "../../states/gameStart.state";
import { GhostKey } from "../../types/ghostKey";

type PropsStyled = {
  color: string,
  runningSpeed: number,
  transitionTime: number
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
  0%{ left: -${config.tileSizeInPx / 2}px; }
	100%{ left: -${config.tileSizeInPx}px; }
`

const GhostBody = styled.div<PropsStyled>`
  background-color: ${p => p.color};
  height: ${config.tileSizeInPx * 1.6}px;
  width: ${config.tileSizeInPx * 1.4}px;
  position: absolute;
  place-self: center;
  transition: translate linear ${p => p.transitionTime}s;
  border-radius: ${config.tileSizeInPx * 1.2}px ${config.tileSizeInPx * 1.2}px 0 0px ;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom:  ${config.tileSizeInPx / 4}px;
  box-sizing: border-box;

  &.feared{
    background-color: blue;
  }
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

const FearedFace = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: ${config.tileSizeInPx / 4}px;
  width: 100%;
  height: 100%;

  .eyes{
    margin-top: ${config.tileSizeInPx / 2}px;
    height: ${config.tileSizeInPx / 5}px;
    width: ${config.tileSizeInPx / 5}px;
    background-color: #ececec;
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
  bottom: 0;
  width: 100%;
  height: ${config.tileSizeInPx / 4}px;
  overflow: hidden;
  
  .running-container{
    animation: ${GhostMovingKeyframe} ${p => p.runningSpeed}s linear infinite;
    display: flex;
    position: absolute;
    left: -${config.tileSizeInPx / 2}px;

    div{
      width: 0; 
      height: 0; 
      border-left: ${config.tileSizeInPx / 4}px solid transparent;
      border-right: ${config.tileSizeInPx / 4}px solid transparent;
      border-bottom: ${config.tileSizeInPx / 4}px solid #282C34;
    }
  }
`

type Props = {
  type: GhostKey;
}

function Ghost(props: Props): ReactElement {
  const [fullMazeState, setFullMazeState] = useRecoilState(FullMazeState);
  const [gameStart, setStartGame] = useRecoilState(GameStart);

  const ghostState = fullMazeState.charactersState.find(character => character.identification === props.type) as CharacterStateType;
  
  const pupilsIndexObject: IndexObject<Directions, any> = {
    down: {top: '4px'},
    left: {left: '0', '&::after': {left: '12px'}},
    right: {left: '5px', '&::after': {left: '11px'}},
    up: {top: '0'}
  }  

  const ghostX =  gameStart ? ghostState.positionX : ghostState.positionX + config.tileSizeInPx/2;
  const ghostY = ghostState.positionY;

  const ghostStyle: React.CSSProperties = {
    translate: `${ghostX}px ${ghostY}px`,
  }

  const ghostColor = {
    '1': '#FF0000',
    '2': '#00ffff',
    '3': '#ffb8ff',
    '4': '#ffb851',
  };


  const transitionTime = ghostState.teleporting ? 0 : config.pacmanSpeed;
  const runningSpeed = ghostState.moving ? 0.6 : 0;
  const feared = !!fullMazeState.charactersState.find(item => item.type === 'pacman')?.powered;
  // const feared = true;

  return (
    <GhostWrapper>
      <GhostBody transitionTime={transitionTime} runningSpeed={runningSpeed} color={ghostColor[props.type]} style={ghostStyle} className={`${ghostState.direction} ${feared ? 'feared' : null}`}>
        {!feared ?
        <>  
          <GhostEyes className={ghostState.direction}>
            <GhostPupils/>
          </GhostEyes>
          <GhostEyes className={ghostState.direction}>
            <GhostPupils/>
          </GhostEyes>
        </>
        :
        <FearedFace>
          <div className="eyes"/>
          <div className="eyes"/>
          <GhostMouth/>
        </FearedFace>
        }
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