import styled from "styled-components"
import config from "../../config/config"

const S = {
  maze: styled.div`
    width: auto;
    height: auto;
    outline: 10px double blue;
    outline-offset: -10px;
    border-radius: 20px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(${config.mazeColumns}, ${config.tileSizeInPx}px);
    grid-template-rows: repeat(${config.mazeRows}, ${config.tileSizeInPx}px);
    overflow: hidden;
  `,

  mazeWrapper: styled.div`
    position: relative;
  `,

  gameWrapper: styled.div`
    display: grid;
    grid-template-columns: 300px auto;
    padding-right: 300px;
  `
}

export default S