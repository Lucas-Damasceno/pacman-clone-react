import styled from "styled-components"

const S = {
  maze: styled.div`
    width: auto;
    height: auto;
    border: 10px double blue;
    border-radius: 20px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(23, 40px);
    grid-template-rows: repeat(22, 40px);
  `,
}

export default S