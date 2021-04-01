import React from "react";
import styled from "styled-components";
import FileUploadContainer from "./FileUpload";
import FaceInputContainer from "./FaceInput";
import CamUploadContainer from "./CamUpload";
import Container from "Components/Container";
class HomeContainer extends React.Component {
  state = {
    buttonIndex: 0,
  };
  picClick = () => {
    // alert("사진 업로드");
    this.setState({ buttonIndex: 1 });
  };

  camClick = () => {
    // alert("웹캠 사용");
    this.setState({ buttonIndex: 2 });
  };

  render() {
    return (
      <>
        {/* <FileUploadContainer/> */}
        <Container>
          {this.state.buttonIndex == 0 && (
            <>
              <Font50>분기 설정</Font50>
              <ButtonContainer>
                <PicUploadButton onClick={this.picClick}>
                  <Font15>사진 업로드</Font15>
                </PicUploadButton>
                <WebcamButton onClick={this.camClick}>
                  <Font15>웹캠 사용</Font15>
                </WebcamButton>
              </ButtonContainer>
            </>
          )}
          {/* {this.state.buttonIndex == 1 && <FileUploadContainer />} */}
          {this.state.buttonIndex == 1 && (
            <FaceInputContainer inputType={"file"} />
          )}
          {this.state.buttonIndex == 2 && (
            <FaceInputContainer inputType={"cam"} />
          )}
          {/* {this.state.buttonIndex == 2 && <CamUploadContainer />} */}
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
