import React, { ReactElement } from "react";
import styled from "styled-components";

const GhostBody = styled.div`
  background-color: red;
  height: 25px;
  width: 28px;
  place-self: center;
  border-radius: 12px 12px 0 0px ;

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
    margin-top: 22px;
  }
`

type Props = {

}

function Ghost(props: Props): ReactElement{

  return <GhostBody></GhostBody>
}

export default Ghost