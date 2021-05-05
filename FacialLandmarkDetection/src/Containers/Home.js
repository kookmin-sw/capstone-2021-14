import React from "react";
import styled from "styled-components";
import FaceOutputContainer from "./FaceOutput";
import FaceInputContainer from "./FaceInput";
import InitialContainer from "./Init";
import Container from "Components/Container";
import Content from "Components/Content";
import Header from "Components/Header";
import Footer from "Components/Footer";
import NextButton from "../Components/NextButton";
import PrevButton from "../Components/PrevButton";
import HomeButton from "../Components/HomeButton";
import { observer, inject } from "mobx-react";
import EducationContainer from "./Education";
@inject("ManageFile")
@observer
class HomeContainer extends React.Component {
  state = {
    buttonIndex: 0,
  };

  picClick = () => {
    // alert("사진 업로드");
    // this.setState({ buttonIndex: 1 });
    this.props.ManageFile.pageIndex = 2;
  };

  camClick = () => {
    // alert("웹캠 사용");
    // this.setState({ buttonIndex: 2 });
    this.props.ManageFile.pageIndex = 3;
  };

  eduClick = () => {
    this.props.ManageFile.pageIndex = 5;
  };
  componentDidUpdate() {
    // alert("F");
  }
  render() {
    const { ManageFile } = this.props;
    return (
      <>
        {/* <FileUploadContainer/> */}
        <Container>
          <Header>
            <Font50>H A I!</Font50>
          </Header>
          <Content>
            {ManageFile.pageIndex == 0 && <InitialContainer />}
            {ManageFile.pageIndex == 1 && (
              <>
                {/* <Font50>분기 설정</Font50> */}
                <ButtonContainer>
                  <PicUploadButton onClick={this.picClick}>
                    <Font15>사진 업로드</Font15>
                  </PicUploadButton>
                  <WebcamButton onClick={this.camClick}>
                    <Font15>웹캠 사용</Font15>
                  </WebcamButton>

                  <WebcamButton onClick={this.eduClick}>
                    <Font15>학습하기</Font15>
                  </WebcamButton>
                </ButtonContainer>
              </>
            )}
            {ManageFile.pageIndex == 2 && (
              <FaceInputContainer inputType={"file"} />
            )}
            {ManageFile.pageIndex == 3 && (
              <FaceInputContainer inputType={"cam"} />
            )}
            {ManageFile.pageIndex == 4 && <FaceOutputContainer />}
            {ManageFile.pageIndex == 5 && <EducationContainer />}
          </Content>
          <ButtonContainer>
              {ManageFile.pageIndex != 0 && ManageFile.pageIndex != 4 && <PrevButton />}
              {ManageFile.pageIndex != 1 && ManageFile.pageIndex != 2 && ManageFile.pageIndex != 4 && ManageFile.pageIndex != 3 && <NextButton />}
              {ManageFile.pageIndex == 4 && <HomeButton />}
          </ButtonContainer>
          <Footer>
            <Font15>Robolink AI web app free trial</Font15>
          </Footer>
        </Container>
      </>
    );
  }
}

export default HomeContainer;

const ButtonContainer = styled.div`
  width: 90%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PicUploadButton = styled.button`
  color: black;
	width: 120px;
	height: 40px;
  background-color: red;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const WebcamButton = styled.button`
  color: black;
	width: 120px;
	height: 40px;
  background-color: blue;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const Font50 = styled.div`
  color: #FDFFD5;
  font-size: 50px;
  font-weight: bold;
`;

const Font15 = styled.div`
  color: #FDFFD5;
  font-size: 15px;
  font-weight: bold;
`;
