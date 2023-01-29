import React, { ReactElement } from "react";
import styled, {Keyframes, keyframes} from "styled-components";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import FullMazeState from "../../states/fullMaze.state";
import { Tiles } from "../../enums/tiles.enum";
import { CharacterStateType } from "../../types/characterStateType";

const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];

interface PacManPartAnimation{
  top?: Keyframes;
  bottom?: Keyframes;
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
  width: 28px;
  height: 28px;
  transition: translate linear ${p => p.transitionTime}s;
  overflow: hidden;
  /* background-color: yellow; */
  border-radius: 50%;
  scale: 1.3;
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
  animation: ${prop => prop.top} .2s linear infinite;
`;

const PacManBottom = styled.div<PacManPartAnimation>`
  height: 18px;
  width: 40px;
  margin-left: -3px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: yellow;
	transform: rotate(-35deg);
  animation: ${prop => prop.bottom} .2s linear infinite;
`;

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

  const animatedPacMan = {
    top: PacManTopAnimation,
    bottom: PacManBottomAnimation,
  }

  const stopedPacMan = {
    top: undefined,
    bottom: undefined
  }

  const selectedPacManAnimation = pacmanState.moving ? animatedPacMan : stopedPacMan;

  const transitionTime = pacmanState.teleporting ? 0 : config.pacmanSpeed;

  return(
    <PacmanWrapper>
      <PacManCharacter transitionTime={transitionTime} style={pacmanStyle}>
        <PacManTop top={selectedPacManAnimation.top}/>
        <PacManBottom bottom={selectedPacManAnimation.bottom}/>
        {pacmanState.powered}
      </PacManCharacter>
    </PacmanWrapper>
  )
}

export default React.memo(PacMan);