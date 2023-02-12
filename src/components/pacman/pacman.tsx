import React, { ReactElement, useState } from "react";
import styled, {Keyframes, keyframes} from "styled-components";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import GameStart from "../../states/gameStart.state";
import Directions from "../../types/directions";
import PacManState from "../../states/pacMan.state";

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
  const [gameStart, setStartGame] = useRecoilState(GameStart);

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
  }

  const transitionTime = pacManState.teleporting ? 0 : config.pacmanSpeed;
  let animation = pacManState.moving ? PacManMouthAnimation : undefined;

  return(
    <PacmanWrapper>
      <PacManCharacter animation={animation} transitionTime={transitionTime} style={pacmanStyle}>
      </PacManCharacter>
    </PacmanWrapper>
  )
}

export default React.memo(PacMan);