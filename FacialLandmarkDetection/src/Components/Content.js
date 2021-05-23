// import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 12px;
	margin-bottom: 18px;
  @media screen and (min-width: 0px) and (max-width: 767.98px) {
    min-height: 60vh;
  };
  
  @media screen and (min-width: 768px) and (max-width: 1279.98px) {
    min-height: 55vh;
  };
  @media screen and (min-width: 1280px) {
    min-height: 50vh;
  };
`;

export default Content;
