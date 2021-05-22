import React from "react";
import styled from "styled-components";
import NextButton from "../Components/NextButton";
import PrevButton from "../Components/PrevButton";
import { observer, inject } from "mobx-react";

class InitialContainer extends React.Component {
	render(){
		return(
			<>
				{/* <Font50>H A I !</Font50> */}
				<Font30>Hi, AI!</Font30>
				<Font20>얼굴형 기반 헤어스타일 추천 서비스</Font20>
				<Font15>서비스를 이용하기 위해 NEXT 버튼을 클릭해주세요.</Font15>
				{/* <Font15>Robolink AI web app free trial</Font15> */}
			</>
		);
	};
};

export default InitialContainer;

const Font30 = styled.div`
  color: #FDFFD5;
  font-size: 30px;
  font-weight: normal;
	cursor: default;
`;

const Font20 = styled.div`
  color: #FDFFD5;
  font-size: 20px;
  font-weight: normal;
	cursor: default;
`;

const Font15 = styled.div`
  color: #FDFFD5;
  font-size: 15px;
  font-weight: normal;
	cursor: default;
`;

