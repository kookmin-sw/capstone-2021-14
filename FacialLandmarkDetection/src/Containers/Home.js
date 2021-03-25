import React from 'react'
import styled from 'styled-components'
import Container from '../Components/Container'
import FileUploadContainer from "./FileUpload"
class HomeContainer extends React.Component {
  
  picClick = () => {
    alert("사진 업로드");
  }

  camClick = () => {
    alert("웹캠 사용");
  }

  render() {
    //
    
    return (
      <>
        {/* <FileUploadContainer/> */}
        <Container>
          <Font50>분기 설정</Font50>
          <ButtonContainer>
            <PicUploadButton onClick = {this.picClick.bind(this)}>
              <Font15>사진 업로드</Font15>
            </PicUploadButton>
            <WebcamButton onClick = {this.camClick.bind(this)}>
              <Font15>웹캠 사용</Font15>
            </WebcamButton>
          </ButtonContainer>
        </Container>
      </>
    )
  }
}

const ButtonContainer = styled.div`
  width: 70%;
  height: 70px;
  ${'' /* background-color: red; */}
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
  color: balck;
  width: 40%;
  height: 70%;
  background-color: blue;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const Font50 = styled.p`
  color: black;
  font-size: 50px;
  font-weight: bold;
`;

const Font15 = styled.p`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;


export default HomeContainer