import React, { useEffect } from "react";
import Directions from "../types/directions";

interface Props{
  initialTile: string;
  index: number;
  map: string;
}

function Controls(props: Props){

  function _handleKeyDown(event: KeyboardEvent){
    const movement = {
      ArrowRight: '',
      ArrowLeft: '',
      ArrowUp: '',
      ArrowDown: '',
    }

    const move = (direction : Directions) => {

    }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', _handleKeyDown);

    return () => {
      document.removeEventListener('keydown', _handleKeyDown)
      // Anything in here is fired on component unmount.
    } 
  }, [])

  return <></>
}

export default Controls