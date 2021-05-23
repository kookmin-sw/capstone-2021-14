// import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  ${'' /* width: 955px; */}
  
  background: linear-gradient(to bottom right, #8d5aff 30%, #6236ff);
  margin-top: 24px;
  border-radius: 6px;
  box-shadow: 3px 4px 5px 0 rgba(0, 0, 0, 0.5);
  @media screen and (min-width: 0px) and (max-width: 767.98px) {
    width: 90vw;
  };
  
  @media screen and (min-width: 768px) and (max-width: 1279.98px) {
    width: 75vw;
  };
  @media screen and (min-width: 1280px) {
    width: 60vw;
  };
`;

export default Container;
