import React, { ReactElement } from "react";
import styled, {Keyframes, keyframes} from "styled-components";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import FullMazeState from "../../states/fullMaze.state";
import { Tiles } from "../../enums/tiles.enum";
import { CharacterStateType } from "../../types/characterStateType";
import GameStart from "../../states/gameStart.state";

const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];

interface PacManMouthAnimation{
  moving: boolean;
}

interface PacmanCharacterProps{
  transitionTime: number;
  moving: boolean;
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

  animation: ${prop => prop.moving ? PacManMouthAnimation : null} .2s linear infinite;
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

function PacMan(): ReactElement {
  const [fullMazeState, setFullMazeState] = useRecoilState(FullMazeState);
  const [gameStart, setStartGame] = useRecoilState(GameStart);

  const pacmanState = fullMazeState.charactersState.find(character => character.identification === Tiles.pacman) as CharacterStateType;

  const pacManDirectionStyle = {
    up: '90deg',
    down: '-90deg',
    left: '0deg',
    right: '180deg',
  }

  const pacmanX =  gameStart ? pacmanState.positionX : pacmanState.positionX + config.tileSizeInPx/2;
  const pacmanY = pacmanState.positionY;

  const pacmanStyle: React.CSSProperties = {
    translate: `${pacmanX}px ${pacmanY}px`,
    rotate: pacManDirectionStyle[pacmanState.direction],
  }

  const transitionTime = pacmanState.teleporting ? 0 : config.pacmanSpeed;

  return(
    <PacmanWrapper>
      <PacManCharacter moving={pacmanState.moving} transitionTime={transitionTime} style={pacmanStyle}>
        {/* <PacManMouth moving={pacmanState.moving}/> */}
      </PacManCharacter>
    </PacmanWrapper>
  )
}

export default React.memo(PacMan);