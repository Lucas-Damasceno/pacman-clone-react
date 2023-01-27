import styled from "styled-components"
import config from "../../config/config"

const S = {
  maze: styled.div`
    width: auto;
    height: auto;
    outline: 10px double blue;
    outline-offset: -2px;
    border-radius: 20px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(${config.mazeColumns}, 40px);
    grid-template-rows: repeat(22, 40px);
  `,
}

export default S