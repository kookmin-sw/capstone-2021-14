// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

import React, { useRef, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh, checkClick, userFace } from "utilities";
import { drawDot } from "./mask";
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
      drawDot(ctx);
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
  };

  runFacemesh();
  return (
    <div className="App">
      <header className="App-header">
        <img
          id="test"
          src={testImg}
          ref={imageRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {/* <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        /> */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <button
          onClick={ButtonForUserFace}
          style={{ marginTop: "39.5em", marginRight: "7em" }}
        >
          Button
        </button>
        <button
          onClick={checkUserFace}
          style={{ marginTop: "-1.7em", marginLeft: "7em" }}
        >
          Check My Face
        </button>
      </header>
    </div>
  );
}

export default FaceInputContainer;
