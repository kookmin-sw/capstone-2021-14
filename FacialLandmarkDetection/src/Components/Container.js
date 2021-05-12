import React from 'react'
import styled from 'styled-components'



const Container = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  ${'' /* min-height: 70vh; */}
  ${'' /* height: 70vh; */}
  min-height: 70vh;
  width: 80vw;
  ${'' /* background: #15CB71; */}
  ${'' /* background: linear-gradient(to bottom, #58F0AB 10%,#00D000); */}
  background: linear-gradient(to bottom right, #8d5aff 30%, #6236ff);
  margin-top: 24px;
  border-radius: 6px;
  box-shadow: 3px 4px 5px 0 rgba(0, 0, 0, 0.5);
  // @media (min-width: 0px) and (max-width: 767.98px) {
  //   width: calc(100% - 28px);
  // }

  // @media (min-width: 768px) and (max-width: 1279.98px) {
  //   width: 720px;
  // }
  // @media (min-width: 1280px) { 
  //   width: 1200px;
  // }
  
`

export default Container;