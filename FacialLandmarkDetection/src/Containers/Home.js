import React from "react";
import styled from "styled-components";
import FaceOutputContainer from "./FaceOutput";
import FaceInputContainer from "./FaceInput";
import RealtimeFaceOutputContainer from "./RealtimeFaceOutput";
import Container from "Components/Container";
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
    this.props.ManageFile.pageIndex = 1;
  };

  camClick = () => {
    // alert("웹캠 사용");
    // this.setState({ buttonIndex: 2 });
    this.props.ManageFile.pageIndex = 2;
  };

  realTimeCamClick = () => {
    this.props.ManageFile.pageIndex = 5;
  };

  eduClick = () => {
    this.props.ManageFile.pageIndex = 4;
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
          {ManageFile.pageIndex == 0 && (
            <>
              <Font50>분기 설정</Font50>
              <ButtonContainer>
                <PicUploadButton onClick={this.picClick}>
                  <Font15>사진 업로드</Font15>
                </PicUploadButton>
                <WebcamButton onClick={this.camClick}>
                  <Font15>웹캠 사용(캡쳐)</Font15>
                </WebcamButton>
                <WebcamButton onClick={this.realTimeCamClick}>
                  <Font15>웹캠 사용(실시간)</Font15>
                </WebcamButton>

                <WebcamButton onClick={this.eduClick}>
                  <Font15>학습하기</Font15>
                </WebcamButton>
              </ButtonContainer>
            </>
          )}
          {ManageFile.pageIndex == 1 && (
            <FaceInputContainer inputType={"file"} />
          )}
          {ManageFile.pageIndex == 2 && (
            <FaceInputContainer inputType={"cam"} />
          )}
          {ManageFile.pageIndex == 3 && <FaceOutputContainer />}
          {ManageFile.pageIndex == 4 && <EducationContainer />}
          {ManageFile.pageIndex == 5 && <RealtimeFaceOutputContainer />}
        </Container>
      </>
    );
  }
}

export default HomeContainer;

const ButtonContainer = styled.div`
  width: 70%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PicUploadButton = styled.button`
  color: black;
  width: 40%;
  height: 70%;
  background-color: red;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const WebcamButton = styled.button`
  color: black;
  width: 40%;
  height: 70%;
  background-color: blue;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const Font50 = styled.p`
  color: white;
  font-size: 50px;
  font-weight: bold;
`;

const Font15 = styled.p`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;
