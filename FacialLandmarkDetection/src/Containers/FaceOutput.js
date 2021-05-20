import React, { useRef, useState } from "react";
import "../App.css";
import styled from "styled-components";
//import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// import { drawMesh, checkClick } from "utilities";
import { MobXProviderContext } from "mobx-react";
import { saveAs } from "FileSaver";
// const testImg = "../src/Containers/faceSam.png";
import testImg from "./photo/Egg/1.jpg";
import { inject, observer } from "mobx-react";
import { useObserver } from "mobx-react";
import { loadLayersModel, tensor } from "@tensorflow/tfjs";
import ManageFile from "stores/ManageFile";
//import { read_csv, OneHotEncoder } from "danfojs-node";

// @inject("ManageFile")
// @observer
export var downcheck = null;
function useStores() {
  return React.useContext(MobXProviderContext);
}
let counter = 0;
let intervalId;
let pageIndex;
const FaceType = ["둥근형", "역삼각형", "계란형", "각진형"];

function FaceOutputContainer() {
  // const [isDetected, setDetected] = useState(false);

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
    pageIndex = ManageFile.pageIndex;

    intervalId = setInterval(() => {
      console.log("Start detection!");
      detect(net);
    }, 1000); // 200ms
  };

  // Detect function
  const detect = async (net) => {
    console.log("Start prediction!");

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

    const ctx = canvasRef.current.getContext("2d");
    ManageFile.faceType = drawMesh(face, ctx);

    // drawDot(ctx);
  };

  runFacemesh();

  return (
    <>
      {/* 당신의 얼굴형은 {ManageFile.faceType} 입니다! */}
      <p style={{ color: "white", cursor: "none"}}>
        당신의 <p fontWeight={"bold"} style={{ color: "blue", display: "inline-block", fontWeight: "bold" }}>얼굴형</p>
        을 확인해보세요.
      </p>
      {/* <p>{!isDetected ? '인식중...' : '인식 완료'}</p> */}
      <p>인식중. . .</p>
      <ImageContainer>
        <img
          id="test"
          src={ManageFile.imageUrl}
          ref={imageRef}
          style={{
            position: "relative",
            top: 0,
            left: '5%',
            width: '90%',
            height: 'auto',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: '5%',
            width: '90%',
            height: 'auto',
          }}
        />
      </ImageContainer>
    </>
  );
}

var DOTS = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 
  378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 
  162, 21, 54, 103, 67, 109, 151, 337, 299, 333, 298, 301, 368, 264, 447, 
  366, 401, 435, 367, 364, 394, 395, 369, 396, 175, 171, 140, 170, 169, 
  135, 138, 215, 177, 137, 227, 34, 139, 71, 68, 104, 69, 108,
];

// Drawing Mesh
const drawMesh = (predictions, ctx) => {
  // console.log("downcheck=" + downcheck);
  counter++;
  if (counter >= 5) {
    console.log("CLEAR!!!!");
    clearInterval(intervalId);
    downcheck = true;
    // this.setState({isDetected:true});
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
          //console.log("here")
          //console.log(keypoints[i][0], keypoints[i][1]);
          //console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, 3 * Math.PI);
          ctx.fillStyle = "SpringGreen";
          ctx.fill();

          //z값 제외
          finalData.push(x);
          finalData.push(y);
        }
      }
      //put Keypoints to Shape Model
      /*if (downcheck) {
        let sum = 0.0;
        for (let i = 0; i < finalData.length; i++) {
          sum += finalData[i];
        }
        let mean = sum / finalData.length;
        let devSum = 0;
        for (let i = 0; i < finalData.length; i++) {
          let dev = finalData[i] - mean;
          devSum += dev * dev;
        }
        //표준편차
        let stdDev = Math.sqrt(devSum / finalData.length);
        for (let i = 0; i < finalData.length; i++) {
          finalData[i] = (finalData[i] - mean) / stdDev;
        }
        console.log(finalData);

        // 추출한 좌표를 Shape Model의 input으로 넣는다.
        let max = 0;
        let max_id = 0;
        const model = loadLayersModel(
          "https://seonjongyoo.github.io/ModelServer/my-model.json"
        );
        const tensor_shape = [1, 144];
        const input = tensor(finalData, tensor_shape);

        // 현재는 볼 쪽의 점들도 포함한 dataset으로 추후 이 점들을 제외한 데이터 사용
        model.then(function (result) {
          const rvalue = result.predict(input);
          rvalue.data().then(function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
              if (data[i] <= 1 && data[i] > max) {
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
        });
      }*/

      // create textfile for data modeling
      if (downcheck && pageIndex == 5) {
        //console.log("finalData: ", finalData);

        // console.log("here");
        var blob = new Blob([finalData], { type: "text/plain;charset=utf-8" });
        // save txt file with photo file name
        saveAs(blob, "data.txt");
      }
      console.log(keypoints[234][0], keypoints[234][1]);
      console.log(keypoints[454][0], keypoints[454][1]);
      console.log(keypoints[10][0], keypoints[10][1]);
      console.log(keypoints[152][0], keypoints[152][1]);
    });
  }
};

export default FaceOutputContainer;

const ImageContainer = styled.div`
  min-width: 100%;
  min-height: 50vh;
  position: relative;
  top: 0;
  left: 0;
  align-items: center;
  justify-sentence: center;
`;