import React from "react";
import styled from "styled-components";
// <<<<<<< HEAD
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh, checkClick, userFace } from "utilities";
//import { drawDot } from "./mask";
import { getUserFace } from "./compare";

// const testImg = "../src/Containers/faceSam.png";
import testImg from "./faceSample3.png";

function FaceInputContainer() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const imageRef = useRef(null);

  // const imageRef = React.createRef();

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setInterval(() => {
      detect(net);
    }, 1000); // 1000ms
  };

  // Detect function
  const detect = async (net) => {
    // const video = webcamRef.current.video;
    // console.log(video);

    // const videoWidth = webcamRef.current.video.videoWidth;
    // const videoHeight = webcamRef.current.video.videoHeight;

    // // Set video width
    // webcamRef.current.video.width = videoWidth;
    // webcamRef.current.video.height = videoHeight;

    // // Set canvas width
    // canvasRef.current.width = videoWidth;
    // canvasRef.current.height = videoHeight;

    // Make detections
    // const face = await net.estimateFaces({ input: video });
    const image = imageRef.current;
    // console.log(image);
    const imageWidth = imageRef.current.width;
    // console.log(imageWidth);
    const imageHeight = imageRef.current.height;

    // imageRef.current.image.width = imageWidth;
    // imageRef.current.image.height = imageHeight;

    // imageRef.current.img.imageWidth = imageWidth;
    // imageRef.current.img.imageHeight = imageHeight;

    // Set canvas width
    canvasRef.current.width = imageWidth;
    canvasRef.current.height = imageHeight;

    // const imageElement = document.getElementById("test");
    const face = await net.estimateFaces({
      input: image,
    });

    // console.log(face);

    // console.log(document.getElementById("test"));
    // Get canvas context for drawing
    const ctx = canvasRef.current.getContext("2d");
    drawMesh(face, ctx);
    // drawDot(ctx);

    if (
      typeof webcamRef.current !== "underfined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const face = await net.estimateFaces({ input: video });
      const imageElement = document.getElementById("test");
      // const face = await net.estimateFaces({
      //   input: imageElement,
      // });

      // console.log(face);

      // console.log(document.getElementById("test"));
      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
      //drawDot(ctx);
    }
  };

  // Click the Button
  const ButtonForUserFace = () => {
    checkClick(true);
  };

  const checkUserFace = () => {
    console.log("ok!");
    getUserFace();
    //console.log(userFace);

import FileUploadContainer from "./FileUpload";
import CamUploadContainer from "./CamUpload";
import Container from "Components/Container";
import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer
class FaceInputContainer extends React.Component {
  state = {
    f: 0, d5b9805d79ba38687732e6cda9f06ca44d922eab
  };
  render() {
    const { inputType } = this.props;

    const ConfirmButtonClick = () => {
      this.props.ManageFile.pageIndex = 3;
      // alert(this.props.ManageFile.pageIndex);
    };

    return (
      <>
        {/* {this.props.ManageFile.pageIndex} */}
        <Container>
          {inputType == "file" ? (
            <FileUploadContainer />
          ) : (
            <CamUploadContainer />
          )}

          <ConfirmButton onClick={ConfirmButtonClick}>확인!</ConfirmButton>
        </Container>
      </>
    );
  }
}

export default FaceInputContainer;

const ConfirmButton = styled.div`
  background-color: green;
  border: 1px solid gray;
  padding: 5px 10px 5px 10px;
