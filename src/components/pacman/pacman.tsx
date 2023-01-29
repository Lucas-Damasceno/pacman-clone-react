import React, { ReactElement } from "react";
import styled, {Keyframes, keyframes} from "styled-components";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import FullMazeState from "../../states/fullMaze.state";
import { Tiles } from "../../enums/tiles.enum";
import { CharacterStateType } from "../../types/characterStateType";

const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];

interface PacManMouthAnimation{
  moving: boolean;
}

interface PacmanCharacterProps{
  transitionTime: number;
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
`;

const PacManMouth = styled.div<PacManMouthAnimation>`
  top: ${config.tileSizeInPx / 12}px;
  width: 0; 
  height: 0; 
  left: 0;
  border-top: ${config.tileSizeInPx / 2.2}px solid transparent;
  border-left: ${config.tileSizeInPx / 1.5}px solid #282C34;
  border-bottom: ${config.tileSizeInPx / 2.2}px solid transparent;
  animation: ${prop => prop.moving ? PacManMouthAnimation : null} .2s linear infinite;
`

const PacManMouthAnimation = keyframes`
  0%{
    border-top: ${config.tileSizeInPx / 2.2}px solid transparent;
    border-left: ${config.tileSizeInPx / 1.5}px solid #282C34;
    border-bottom: ${config.tileSizeInPx / 2.2}px solid transparent;
  }
  50%{
    border-top: 0 solid transparent;
    border-left: ${config.tileSizeInPx / 1.5}px solid #282C34;
    border-bottom: 0 solid transparent;
  }
`

function PacMan(): ReactElement {
  const [fullMazeState, setFullMazeState] = useRecoilState(FullMazeState);
  const pacmanState = fullMazeState.charactersState.find(character => character.identification === Tiles.pacman) as CharacterStateType;

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

  const transitionTime = pacmanState.teleporting ? 0 : config.pacmanSpeed;

  return(
    <PacmanWrapper>
      <PacManCharacter transitionTime={transitionTime} style={pacmanStyle}>
        <PacManMouth moving={pacmanState.moving}/>
      </PacManCharacter>
    </PacmanWrapper>
  )
}

export default React.memo(PacMan);