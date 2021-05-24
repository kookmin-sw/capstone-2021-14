import React, { useRef, useEffect, useState, useCallback } from "react";
import "../App.css";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// import { drawMesh, checkClick } from "utilities";
import { MobXProviderContext } from "mobx-react";
// import { inject, observer } from "mobx-react";
// import { useObserver } from "mobx-react";
import Webcam from "react-webcam";
import ManageFileContainer from "../stores/ManageFile";
import MaleIcon from "./faceSample3.png";
import FaceCheckContainer from "./FaceCheck";
import FrontContainer from "./Front";
// @inject("ManageFile")
// @observer
export var downcheck = null;
function useStores() {
  return React.useContext(MobXProviderContext);
}
// let counter = 0;
let intervalId;
// let pageIndex;
let isFront = 0;
// let isWorking = undefined;
let count = 0;
let Input_image;
const FaceType = ["둥근형", "계란형", "역삼각형", "각진형"];

function preprocess(img) {
  const data = new Uint8Array(img.data);
  //convert the image data to a tensor
  // console.log(`data: ${img.data}`);
  // img.width = imageWidth;
  // img.height = imageHeight;
  // console.log(`imageWidth: ${imageWidth}`);
  // console.log(`imageHeight: ${imageHeight}`);
  // console.log(img);
  let tensor = tf.browser.fromPixels({
    data,
    width: img.width,
    height: img.height,
  });
  // let tensor = tf.browser.fromPixels(img);
  console.log(`tensor: ${tensor}`);
  // console.log("1");
  //resize to 224 X 224
  const resized = tf.image.resizeBilinear(tensor, [224, 224]).toFloat();
  // Normalize the image
  const offset = tf.scalar(255.0);
  const normalized = tf.scalar(1.0).sub(resized.div(offset));
  //We add a dimension to get a batch shape
  const batched = normalized.expandDims(0);
  // console.log("2");
  return batched;
}

function RealtimeFaceOutputContainer() {
  const [isCapture, setIsCapture] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const { ManageFile } = useStores();
  // const imageRef = React.createRef();

  const capture = () => {
    console.log("Capture!!!!!!!!!!!!!!!!");
    const imgSrc = webcamRef.current.getScreenshot();
    captureImage(imgSrc, (m_url) => {
      // ManageFile.imageUrl = m_url;
      ManageFile.setImageUrl(m_url);
      ManageFile.setIsCapture(true);
      setIsCapture(true);
      clearInterval(intervalId);
    });
  };

  const captureImage = (imageBase64, cb) => {
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
    imageRef.current = img;
    // imageWidth = canvasRef.current.width;
    // imageHeight = canvasRef.current.height;
    // console.log(`current width: ${canvasRef.current.width}`);
    // console.log(`current height: ${canvasRef.current.height}`);
    // imageRef.current.width = canvasRef.current.width;
    // imageRef.current.height = canvasRef.current.height;
  };

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    // const image = imageRef.current;
    // Input_image = image;
    // console.log(Input_image);
    console.log("init counter");
    //detect(net);
    downcheck = false;
    // counter = 0;
    // pageIndex = ManageFile.pageIndex;

    intervalId = setInterval(() => {
      // console.log("detect()");
      // console.log("isFront: ", isFront);
      detect(net);
    }, 1000); // 1000ms로 고정
  };

  const drawMesh = (predictions, ctx) => {
    // console.log("downcheck=" + downcheck);

    //   counter++;

    //   if (counter >= 5) {
    //     console.log("CLEAR!!!!");
    //     clearInterval(intervalId);
    //     downcheck = true;
    //   }

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
        checkFace(keypoints);
        if (ManageFile.counter == 6) {
          capture();
          // setIsCapture(true);

          let max = 0;
          let max_id = 0;
          const model = tf.loadLayersModel(
            "https://seonjongyoo.github.io/ModelServer/model-v3/model.json"
          );
          console.log("Complete to load Model");
          // console.log(imageRef.current);
          // console.log(`imageRef.current: ${imageRef.current}`)
          // const image = imageRef.current;
          // Input_image = image;
          const imageWidth = canvasRef.current.width;
          const imageHeight = canvasRef.current.height;
          imageRef.current.width = imageWidth;
          imageRef.current.height = imageHeight;

          // console.log(`current width: ${imageWidth}`);
          // console.log(`current height: ${imageHeight}`);
          // console.log(`Input Image: ${imageRef.current}`);
          const img = preprocess(imageRef.current);
          // console.log(`img: ${img}`);
          // const img = preprocess(Input_image);

          // const img = imageRef.current;
          console.log("Checking...");
          model.then(function (result) {
            console.log("Wait a minute please...");
            const rvalue = result.predict(img);
            console.log("Just a moment!");
            // console.log(rvalue);
            rvalue.data().then(function (data) {
              console.log(data);
              for (let i = 0; i < data.length; i++) {
                if (data[i] > max) {
                  max = data[i];
                  max_id = i;
                }
              }
              // 예측값(tensor)에서 최댓값과 인덱스 추출
              console.log(max);
              console.log("Your Face ID is ", max_id);
              // alert("당신의 얼굴형은 " + FaceType[max_id] + "입니다!");
              ManageFile.setFaceType(FaceType[max_id]);
              console.log(`this.faceType: ${ManageFile.faceType}`);
              return;
              // ManageFile.faceType = FaceType[max_id]
              // ManageFile.faceType = "ffff"
            });
          });
        }
      });
    }
  };

  const checkFace = (keypoints) => {
    var std = 77;
    var user = keypoints[454][0] - keypoints[234][0];
    var ratio = user / std;
    var A = keypoints[10][0] - keypoints[234][0];
    var B = keypoints[454][0] - keypoints[10][0];
    var C = keypoints[10][0] - keypoints[152][0];
    console.log(ManageFile.counter);
    if (ManageFile.counter <= 5) {
      if (A - B > 10 * ratio) { console.log("turn Left"); ManageFile.setIsFront(false); ManageFile.setZero(); }
      else if (A - B < -10 * ratio) { console.log("turn Right"); ManageFile.setIsFront(false); ManageFile.setZero(); }
      else if (Math.abs(C) > 10 * ratio) { console.log("a"); ManageFile.setIsFront(false); ManageFile.setZero(); }
      else { console.log("good"); ManageFile.setIsFront(true); ManageFile.increase(); }
    }
    else if (ManageFile.counter == 6) {
      console.log("Send to model And go to result page"); // To do
      clearInterval(intervalId);

      ManageFile.increase();
    }
  };

  // Detect function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
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

      // Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({ input: video });
      // console.log(face);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  runFacemesh();

  return (
    <>
      {/* <div style={{ color: "white", cursor: "none"}}>
        당신의 <p fontWeight={"bold"} style={{ color: "blue", display: "inline-block", fontWeight: "bold" }}>얼굴형</p>
        을 확인해보세요.
      </div> */}
      {/* <p>인식 중 . . .</p> */}
      <FrontContainer />
      <ImageContainer>
        <MyWebcam
          ref={webcamRef}
          style={{
            position: "relative",
            top: 0,
            left: "5%",
            width: "90%",
            height: "auto",
          }}
          screenshotFormat="image/jpeg"
          object-fit={"contain"}
          screenshotQuality={1}
          active={ManageFile.isCapture}
        />
        <MyCanvas
          ref={canvasRef}
          active={ManageFile.isCapture}
          style={{
            position: "absolute",
            top: 0,
            left: "5%",
            width: "90%",
          }}
        />
        {/* {ManageFile.imageUrl} */}
        {
          <img
            id="test"
            src={ManageFile.imageUrl}
            // src={stateSrc}
            // src={MaleIcon}
            // ref={this.setImageRef}
            ref={imageRef}
            style={{
              position: "relative",
              top: 0,
              left: "5%",
              width: "90%",
              // width: "auto",
              height: "auto",
              display: "none",
            }}
            object-fit="contain"
            // width="640"
            // height="640"
          />
        }
      </ImageContainer>
    </>
  );
}

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

export default RealtimeFaceOutputContainer;

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

const MyWebcam = styled(Webcam)`
  display: ${(props) => (props.active ? "none" : "block")};
`;

const MyCanvas = styled.canvas`
  display: ${(props) => (props.active ? "none" : "block")};
`;