import React, { ReactElement } from "react";
import styled from "styled-components";
import { GhostKey } from "../../types/ghostKey";
import { useRecoilValue } from 'recoil';
import GhostSelector from "../../states/ghost.selector";
import { PossibleGhostState } from "../../types/possibleGhostState";
import config from "../../config/config";

type PropsStyled = {
  color: string,
}

const GhostBody = styled.div<PropsStyled>`
  background-color: ${p => p.color};
  height: 25px;
  width: 28px;
  place-self: center;
  transition: transform linear ${config.pacmanSpeed}s;
  border-radius: 12px 12px 0 0px ;
  position: relative;

  &::after{
    background: linear-gradient(-45deg,${p => p.color} 5px,transparent 0),linear-gradient(45deg,${p => p.color} 5px,transparent 0);
    background-position: left-bottom;
    background-repeat: repeat-x;
    background-size: 9px;
    content: " ";
    display: block;
    width: 100%;
    height: 8px;
    rotate: 180deg;
    margin-top: 16px;
    position: absolute;
    bottom: -5px;
    left: 0;
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
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: black;
    position: absolute;
    top: 3px;
    left: 3px;

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
`

type Props = {
  type: PossibleGhostState;
}

function Ghost(props: Props): ReactElement {

  const ghostState = useRecoilValue(GhostSelector('ghost2'));
  // console.count('Ghost Rodou');

  const ghostStyle: React.CSSProperties = {
    transform: `translateX(${ghostState.positionX}px) translateY(${ghostState.positionY}px)`
  }

  const ghostColor = {
    'ghost1': '#F70000',
    'ghost2': '#F7B2F7',
    'ghost3': '#FFB851',
    'ghost4': '#009999',
  };

  return (
    <GhostBody color={ghostColor[props.type]} style={ghostStyle}>
      <GhostEyes>
        <GhostPupils />
      </GhostEyes>
    </GhostBody>
  )
}

export default React.memo(Ghost)