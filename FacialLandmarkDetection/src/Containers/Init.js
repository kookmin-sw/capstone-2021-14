import React from "react";
import styled from "styled-components";
import NextButton from "../Components/NextButton";
import PrevButton from "../Components/PrevButton";
import { observer, inject } from "mobx-react";

import MaleIcon from "./maleIcon.png";
import FemaleIcon from "./femaleIcon.png";

@inject("ManageFile")
@observer
class InitialContainer extends React.Component {
  state = {
    buttonIndex: 0,
  };

  radioHandler = (idx) => {
    // this.setState({ buttonIndex: idx });
    this.props.ManageFile.genderButtonIndex = idx;
  };
  activeHandler = (idx) => {
    if (this.props.ManageFile.genderButtonIndex === idx) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <>
        {/* <Font50>H A I !</Font50> */}
        <Font30>Hi, AI!</Font30>
        <Font20>얼굴형 기반 헤어스타일 추천 서비스</Font20>
        <Font20>성별을 선택하세요</Font20>
        <GenderBox>
          <GenderButton
            onClick={() => this.radioHandler(1)}
            active={this.activeHandler(1)}
            // style={{ background: "#0933b3" }}
          >
            {/* <Font20>Male</Font20> */}
            <img src={MaleIcon} />
          </GenderButton>
          <GenderButton
            onClick={() => this.radioHandler(2)}
            active={this.activeHandler(2)}
            // style={{ background: "#cd0000" }}
          >
            {/* <Font20>Female</Font20> */}
            <img src={FemaleIcon} />
          </GenderButton>
        </GenderBox>
        <Font15>서비스를 이용하기 위해 NEXT 버튼을 클릭해주세요.</Font15>
        {/* <Font15>Robolink AI web app free trial</Font15> */}
      </>
    );
  }
}

export default InitialContainer;

const GenderBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

const GenderButton = styled.div`
  width: 100px;
  height: 100px;
  /* background: lightblue; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.active ? "2px solid blue" : "2px solid black")};
  border-radius: 5px;
  /* background: white; */
  img {
    width: 95%;
    height: 95%;
  }
`;
const Font30 = styled.div`
  color: #fdffd5;
  font-size: 30px;
  font-weight: normal;
	cursor: default;
`;

const Font20 = styled.div`
  color: #fdffd5;
  font-size: 20px;
  font-weight: normal;
	cursor: default;
`;

const Font15 = styled.div`
  color: #fdffd5;
  font-size: 15px;
  font-weight: normal;
	cursor: default;
`;
