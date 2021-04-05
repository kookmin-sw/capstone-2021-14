import React, { useRef, useState } from "react";
import styled from "styled-components";

import Container from "Components/Container";
import Webcam from "react-webcam";
import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer
class CamUploadContainer extends React.Component {
  state = {
    isCapture: false,
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imgSrc = this.webcam.getScreenshot();
    const { ManageFile } = this.props;
    this.captureImage(imgSrc, (m_url) => {
      ManageFile.imageUrl = m_url;
      this.setState({
        isCapture: true,
      });
    });
  };

  captureImage = (imageBase64, cb) => {
    var img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      var canvas = document.createElement("canvas");
      // var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, img.width / 2, img.height / 2);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      cb(canvas.toDataURL("image/jpeg"));
    };
  };

  render() {
    const { ManageFile } = this.props;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };
    return (
      <>
        <Container>
          <Webcam
            audio={false}
            height={360}
            ref={this.setRef}
            mirrored={true}
            screenshotFormat="image/jpeg"
            width={640}
            videoConstraints={videoConstraints}
          />
        </Container>
        {this.state.isCapture && (
          <img src={ManageFile.imageUrl} width="640" height="360" />
        )}
        <ButtonContainer>
          <CaptureButton onClick={this.capture}>
            <Font15>캡쳐</Font15>
          </CaptureButton>
        </ButtonContainer>
      </>
    );
  }
}

// const CamUploadContainer = () => {
//   const [ camState, setCamState ] = useState({
//     isCapture: false,
//     imgSrc: '',
//   })

//   const webcamRef = useRef(null);
//   const capture = React.useCallback(
//     () => {
//       const imgSrc = webcamRef.current.getScreenshot();
//     },
//     [webcamRef],
//   );
//   return(

//   );
// }

export default CamUploadContainer;

const ButtonContainer = styled.div`
  width: 60%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;
const CaptureButton = styled.button`
  color: "black";
  width: 50%;
  height: 70%;
  background-color: green;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const Font15 = styled.p`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;
