import styled from "styled-components"
import config from "../../config/config"

const S = {
  maze: styled.div`
    width: auto;
    height: auto;
    border: 10px double blue;
    border-radius: 20px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(${config.mazeColumns}, 40px);
    grid-template-rows: repeat(22, 40px);
  `,
}

export default S