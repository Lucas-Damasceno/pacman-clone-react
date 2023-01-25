import React, { ReactElement, useEffect } from "react";
import styled, {Keyframes, keyframes} from "styled-components";
import PacmanState from "../../states/pacman.state";
import { useRecoilState } from 'recoil';
import config from "../../config/config";

interface PacManPartAnimation{
  top?: Keyframes;
  bottom?: Keyframes;
}

const PacManCharacter = styled.div`
  width: 28px;
  height: 28px;
  place-self: center;
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

type Props = {
  index: number;
}

function PacMan(props: Props): ReactElement {
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);
  
  const pacManDirectionStyle = {
    up: '90deg',
    down: '-90deg',
    left: '0deg',
    right: '180deg',
  }

  const pacmanStyle: React.CSSProperties = {
    translate: `${pacmanState.positionX}px ${pacmanState.positionY}px`,
    rotate: pacManDirectionStyle[pacmanState.direction]
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

  return(
    <PacManCharacter style={pacmanStyle}>
      <PacManTop top={selectedPacManAnimation.top}/>
      <PacManBottom bottom={selectedPacManAnimation.bottom}/>
    </PacManCharacter>
  )
}

export default React.memo(PacMan);