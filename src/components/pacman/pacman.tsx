import React, { ReactElement } from "react";
import styled, {keyframes} from "styled-components";

const PacManCharacter = styled.div`
  /* background-color: yellow; */
  width: 30px;
  height: 30px;
  place-self: center;
`;

const PacManTopAnimation = keyframes`
 0%  {transform: rotate(0deg);}
	50%{transform: rotate(35deg);}
`

const PacManBottomAnimation = keyframes`
 0%  {transform: rotate(0deg);}
  50%{transform: rotate(-35deg);}	
`

const PacManTop = styled.div`
  height: 15px;
  width: 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: yellow;
  animation: ${PacManTopAnimation} .5s linear infinite;
`;

const PacManBottom = styled.div`
  height: 15px;
  width: 30px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: yellow;
  animation: ${PacManBottomAnimation} .5s linear infinite;
`;


function PacMan(): ReactElement {

  return(
    <PacManCharacter>
      <PacManTop/>
      <PacManBottom/>
    </PacManCharacter>
  )
}

export default PacMan