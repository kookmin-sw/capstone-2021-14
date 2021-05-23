import React from "react";
import styled from "styled-components";

// import Container from "Components/Container";
import Webcam from "react-webcam";
import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer
class CamUploadContainer extends React.Component {
  state = {
    isCapture: false,
    mImage: null,
  };

  componentWillUnmount() {
    this.setState({ isCapture: false });
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  setImageRef = (image) => {
    this.image = image;
    // this.setState({ mImage: image });
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
        <ImageContainer>
          <Webcam
            audio={false}
            // height={"100%"}
            ref={this.setRef}
            mirrored={true}
            screenshotFormat="image/jpeg"
            style={{
              width: "90%",
              height: "auto",
            }}
            videoConstraints={videoConstraints}
            object-fit={"contain"}
            screenshotQuality={1}
          />
          {this.state.isCapture && (
            <img
              src={ManageFile.imageUrl}
              ref={this.setImageRef}
              style={{
                width: "90%",
                height: "auto",
              }}
              object-fit="contain"
            />
          )}
        </ImageContainer>

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

const ImageContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${"" /* margin: 20px; */}
  ${"" /* background: #ff0000; */}
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  ${"" /* width: 60%; */}
  ${"" /* height: 70px; */}
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const CaptureButton = styled.button`
  &:hover {
    cursor: pointer;
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  color: #19c6dd;
  height: 35px;
  width: 60px;
  background-color: #19c6dd;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 5px;
`;

const Font15 = styled.div`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;
