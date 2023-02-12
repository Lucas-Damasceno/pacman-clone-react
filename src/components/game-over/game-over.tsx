import React, { ReactElement } from "react";
import styled from "styled-components";

const GameOverScreen = styled.div`
  position: absolute;
  background-color: red;
  color: black
`

function GameOver(): ReactElement {

  return(
    <GameOverScreen>
      GAME OVER
    </GameOverScreen>
  )
}

export default GameOver