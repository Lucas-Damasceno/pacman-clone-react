import React from "react"
import styled from "styled-components"
import config from "../../config/config"

const GhostMouthS = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  div{
    height: ${config.tileSizeInPx / 10}px;
    width: ${config.tileSizeInPx / 10}px;
    background-color: white;

    &.up{
      margin-top: -${config.tileSizeInPx / 10}px;
    }
  }
`
function GhostMouth() {
  return (
    <GhostMouthS>
      <div />

      <div className="up"/>
      <div className="up"/>

      <div />
      <div />

      <div className="up"/>
      <div className="up"/>

      <div />
      <div />

      <div className="up"/>
      <div className="up"/>

      <div />
    </GhostMouthS>
  )
}

export default GhostMouth