import React, { ReactElement, useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";
import PacmanState from "../../states/pacman.state";
import Controls from "../controls/controls";
import { useRecoilState } from 'recoil';

const PacManCharacter = styled.div`
  /* background-color: yellow; */
  width: 28px;
  height: 28px;
  place-self: center;
  transition: all 1s;
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



function PacMan(): ReactElement {
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);
  const tileSizeInPixels = '40';

  useEffect(() => {
    
  }, [])

  return(
    <>
      <Controls initialTile="a" index={0} map={'aaaa'}/>
      <PacManCharacter>
        <PacManTop/>
        <PacManBottom/>
      </PacManCharacter>
    </>
  )
}

export default PacMan