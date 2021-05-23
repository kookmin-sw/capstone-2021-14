import React, { useRef, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// import { drawMesh, checkClick } from "utilities";
import { MobXProviderContext } from "mobx-react";
// import { inject, observer } from "mobx-react";
// import { useObserver } from "mobx-react";
import Webcam from "react-webcam";
import FrontContainer from './Front';
// @inject("ManageFile")
// @observer
export var downcheck = null;
function useStores() {
  return React.useContext(MobXProviderContext);
}
// let counter = 0;
let intervalId;
// let pageIndex;
let isFront;
// let isWorking = undefined;
let count = 0;
let Input_image;
const FaceType = ["둥근형", "계란형", "역삼각형", "각진형"];

function preprocess(img)
{
  console.log("image in preprocess() = "+img);
    //convert the image data to a tensor 
    let tensor = tf.browser.fromPixels(img)
    //resize to 224 X 224
    const resized = tf.image.resizeBilinear(tensor, [224, 224]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched
}

function RealtimeFaceOutputContainer() {
  // const [isFront, setIsFront] = useState(false);

  useEffect(() => {
    console.log("RealTimeFaceOutput mounted");
    return() => {
      console.log('RealTimeFaceOutput unmounted');
      clearInterval(intervalId);
    }
  });

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
    const image = imageRef.current;
    Input_image = image;
    console.log(Input_image);
    console.log("init counter");
    //detect(net);
    downcheck = false;
    // counter = 0;
    // pageIndex = ManageFile.pageIndex;

    intervalId = setInterval(() => {
      // console.log("detect()");
      console.log("isFront: ", isFront);
      detect(net);
    }, 200); // 1000ms로 고정
  };

  const drawMesh = (predictions, ctx) => {

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
        if (count == 6) {
          let max = 0;
          let max_id = 0;
          const model = tf.loadLayersModel(
            "https://seonjongyoo.github.io/ModelServer/model-v3/model.json"
          );
          console.log("Complete to load Model");
          const img = preprocess(Input_image);
          console.log("Checking...")
          model.then(function (result) {
            console.log("Wait a minute please...");
            const rvalue = result.predict(img);
            console.log("Just a moment!");
            console.log(rvalue);
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
              alert("당신의 얼굴형은 " + FaceType[max_id] + "입니다!");
              return;
              // ManageFile.faceType = FaceType[max_id]
              // ManageFile.faceType = "ffff"
            });
          })
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

    if (count <= 5) {
      if (A - B > 10 * ratio) { console.log("turn Left"); ManageFile.setIsFront(false); count = 0; }
      else if (A - B < -10 * ratio) { console.log("turn Right"); ManageFile.setIsFront(false); count = 0; }
      else if (Math.abs(C) > 10 * ratio) { console.log("a"); ManageFile.setIsFront(false); count = 0; }
      else { console.log("good"); ManageFile.setIsFront(true); count++; }
    }
    else if (count == 6) {
      console.log("Send to model And go to result page"); // To do
      
      count++;
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
      <div style={{ color: "white", cursor: "none"}}>
        당신의 <p fontWeight={"bold"} style={{ color: "blue", display: "inline-block", fontWeight: "bold" }}>얼굴형</p>
        을 확인해보세요.
      </div>
      <p>인식 중 . . .</p>
      <FrontContainer />
      <ImageContainer>
        <Webcam
          ref={webcamRef}
          style={{
            position: "relative",
            top: 0,
            left: '5%',
            width: "90%",
            height: "auto",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: "5%",
            width: "90%",
          }}
        />
      </ImageContainer>
    </>
  );
}

var DOTS = [
  10, 21, 32, 34, 36, 50, 54, 58, 67, 68, 69, 71, 93, 101, 103,
  104, 108, 109, 111, 116, 117, 118, 123, 127, 132, 135, 136, 137, 138, 139, 140, 143, 147, 148, 149, 150, 151, 152,
  162, 169, 170, 171, 172, 175, 176, 177, 187, 192, 194, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211,
  212, 213, 214, 215, 216, 227, 234, 251, 262, 264, 266, 280, 284, 288, 297, 298, 299, 301, 323, 330, 332, 333, 337,
  338, 340, 345, 346, 347, 352, 356, 361, 364, 365, 366, 367, 368, 369, 372, 376, 377, 378, 379, 389, 394, 395, 396,
  397, 400, 401, 411, 416, 418, 421, 422, 423, 424, 425, 426, 427, 428, 430, 431, 432, 433, 434, 435, 436, 447, 454,
];

export default RealtimeFaceOutputContainer;

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  align-items: center;
  justify-sentence: center;
`;
