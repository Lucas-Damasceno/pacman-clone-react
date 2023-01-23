import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from 'recoil';
import GhostColor from "../../states/ghostColor.state";

const GhostBody = styled.div`
  background-color: red;
  height: 25px;
  width: 28px;
  place-self: center;
  border-radius: 12px 12px 0 0px ;
  position: relative;

  &::after{
    background: linear-gradient(-45deg,#ff0000 5px,transparent 0),linear-gradient(45deg,#ff0000 5px,transparent 0);
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

}

function Ghost(props: Props): ReactElement{
  const [color, setColor] = useState('red');
  const [ghostColor, setGhostColor] = useRecoilState(GhostColor);

  useEffect(() => {

  }, [])

  return (
    <GhostBody>
      <GhostEyes>
        <GhostPupils/>
      </GhostEyes>
    </GhostBody>
  )
}

export default Ghost