import styled from "styled-components"

const S = {
  maze: styled.div`
    width: 600px;
    height: 650px;
    border: 10px double blue;
    border-radius: 20px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(23, 1fr);
  `,
}

export default S