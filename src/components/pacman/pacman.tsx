import React, { ReactElement, useEffect } from "react";
import styled, {keyframes} from "styled-components";
import PacmanState from "../../states/pacman.state";
import { useRecoilState } from 'recoil';
import config from "../../config/config";

const PacManCharacter = styled.div`
  width: 28px;
  height: 28px;
  place-self: center;
  transition: all ${config.pacmanSpeed}s;
`;

const PacManTopAnimation = keyframes`
  0%{transform: rotate(0deg);}
	50%{transform: rotate(35deg);}
`

const PacManBottomAnimation = keyframes`
  0%{transform: rotate(0deg);}
  50%{transform: rotate(-35deg);}	
`

const PacManTop = styled.div`
  height: 15px;
  width: 28px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: yellow;
  animation: ${PacManTopAnimation} .5s linear infinite;
`;

const PacManBottom = styled.div`
  height: 15px;
  width: 28px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: yellow;
  animation: ${PacManBottomAnimation} .5s linear infinite;
`;

type Props = {
  index: number;
}

function PacMan(props: Props): ReactElement {
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);
  const pacmanStyle: React.CSSProperties = {
    transform: `translateX(${pacmanState.positionX}px) translateY(${pacmanState.positionY}px)
    ${pacmanState.direction === 'right' ? 'rotate(180deg)' : ''}
    ${pacmanState.direction === 'left' ? 'rotate(0deg)' : ''}
    ${pacmanState.direction === 'up' ? 'rotate(90deg)' : ''}
    ${pacmanState.direction === 'down' ? 'rotate(-90deg)' : ''}
    `
  }

  useEffect(() => {
    setPacmanState({
      ...pacmanState,
      index: props.index,
    })
  }, []);

  return(
    <>
      <PacManCharacter style={pacmanStyle}>
        <PacManTop/>
        <PacManBottom/>
      </PacManCharacter>
    </>
  )
}

export default React.memo(PacMan);