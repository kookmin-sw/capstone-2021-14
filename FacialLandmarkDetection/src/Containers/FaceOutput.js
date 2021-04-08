import React, { useRef, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// import { drawMesh, checkClick } from "utilities";
import { MobXProviderContext } from "mobx-react";
import { saveAs } from "FileSaver";
// const testImg = "../src/Containers/faceSam.png";
import testImg from "./photo/Egg/1.jpg";
import { inject, observer } from "mobx-react";
import { useObserver } from "mobx-react";

// @inject("ManageFile")
// @observer
export var downcheck = null;
function useStores() {
  return React.useContext(MobXProviderContext);
}
let counter = 0;
let intervalId;
function FaceOutputContainer() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const { ManageFile } = useStores();
  // const imageRef = React.createRef();

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );

    console.log("init counter");
    //detect(net);
    downcheck = false;
    counter = 0;
    intervalId = setInterval(() => {
      console.log("detect()");
      detect(net);
    }, 1000); // 1000ms
  };

  // Detect function
  const detect = async (net) => {
    console.log("RR");
    const image = imageRef.current;
    // console.log(image);
    const imageWidth = imageRef.current.width;
    // console.log(imageWidth);
    const imageHeight = imageRef.current.height;

    // Set canvas width
    canvasRef.current.width = imageWidth;
    canvasRef.current.height = imageHeight;

    // const imageElement = document.getElementById("test");
    const face = await net.estimateFaces({
      input: image,
      predictIrises: false,
    });

    // console.log(face);

    // Get canvas context for drawing

    /*if (ManageFile.pageIndex == 4) {
      var blob = new Blob([face[0].scaledMesh], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "data.txt");
    }*/

    const ctx = canvasRef.current.getContext("2d");
    drawMesh(face, ctx);

    // drawDot(ctx);
  };

  runFacemesh();
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={ManageFile.imageUrl} ref={imageRef} /> */}
        <img
          id="test"
          src={ManageFile.imageUrl}
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

        {/* <button
          onClick={ButtonForUserFace}
          style={{ marginTop: "50em", marginRight: "8.5em" }}
        >
          Button
        </button>
        <button
          onClick={checkUserFace}
          style={{ marginTop: "-1.7em", marginLeft: "7em" }}
        >
          Check My Face
        </button> */}
      </header>
    </div>
  );
}

// import { saveAs } from "FileSaver";
// import { downcheck } from "Containers/FaceOutput";

// length = 130. dots for detecting face shape
var DOTS = [
  10,
  21,
  32,
  34,
  36,
  50,
  54,
  58,
  67,
  68,
  69,
  71,
  93,
  101,
  103,
  104,
  108,
  109,
  111,
  116,
  117,
  118,
  123,
  127,
  132,
  135,
  136,
  137,
  138,
  139,
  140,
  143,
  147,
  148,
  149,
  150,
  151,
  152,
  162,
  169,
  170,
  171,
  172,
  175,
  176,
  177,
  187,
  192,
  194,
  199,
  200,
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  210,
  211,
  212,
  213,
  214,
  215,
  216,
  227,
  234,
  251,
  262,
  264,
  266,
  280,
  284,
  288,
  297,
  298,
  299,
  301,
  323,
  330,
  332,
  333,
  337,
  338,
  340,
  345,
  346,
  347,
  352,
  356,
  361,
  364,
  365,
  366,
  367,
  368,
  369,
  372,
  376,
  377,
  378,
  379,
  389,
  394,
  395,
  396,
  397,
  400,
  401,
  411,
  416,
  418,
  421,
  422,
  423,
  424,
  425,
  426,
  427,
  428,
  430,
  431,
  432,
  433,
  434,
  435,
  436,
  447,
  454,
];

// Drawing Mesh
const drawMesh = (predictions, ctx) => {
  // console.log("downcheck=" + downcheck);

  counter++;

  if (counter >= 10) {
    console.log("CLEAR!!!!");
    clearInterval(intervalId);
    downcheck = true;
  }

  if (predictions.length > 0) {
    predictions.forEach((prediction, result) => {
      const keypoints = prediction.scaledMesh;
      var finalData = [];
      // Draw Dots
      for (let i = 0; i < keypoints.length; i++) {
        // 먼저, index가 DOTS에 포함된 index인지 확인
        result = DOTS.includes(i);
        if (result) {
          const [x, y, z] = keypoints[i];
          // console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, 3 * Math.PI);
          ctx.fillStyle = "SpringGreen";
          ctx.fill();

          finalData.push(keypoints[i]);
        }
      }
      // create textfile for data modeling
      if (downcheck) {
        // console.log("here");
        var blob = new Blob([finalData], { type: "text/plain;charset=utf-8" });
        // save txt file with photo file name
        saveAs(blob, "data.txt");
      }
    });
  }
};

export default FaceOutputContainer;
