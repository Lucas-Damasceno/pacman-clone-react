import React from "react"
import styled from "styled-components"
import config from "../../config/config"

const GhostMouthS = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  div{
    height: ${config.tileSizeInPx / 12}px;
    width: ${config.tileSizeInPx / 12}px;
    background-color: #ececec;

    &.up{
      margin-top: -${config.tileSizeInPx / 12}px;
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