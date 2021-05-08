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
let pageIndex;

function FaceOutputContainer() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const { ManageFile } = useStores();
  // const imageRef = React.createRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.jsdelivr.net/npm/danfojs@0.1.2/dist/index.min.js";
    script.text = "console.log('f')";
    document.body.appendChild(script);
  }, []);
  const PrintResult = (type) => {
    switch (type) {
      case "0":
        console.log("둥근형");
        break;
      case "1":
        console.log("계란형");
        break;
      case "2":
        console.log("각진형");
        break;
      case "3":
        console.log("역삼각형");
        break;
    }
  };

  PrintResult("3");
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
      console.log("detect()");
      detect(net);
    }, 200); // 200ms
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

  //================================

  // console.log(dfd);
  // /*let max = 0;
  //           tf.loadLayersModel('localstorage://my-model').then(function(model) {
  //               dfd.read_csv('./dataset/norm-all-data.csv').then(function(DATA) {
  //                   input = DATA.loc({rows: [15]});
  //                   // 현재는 볼 쪽의 점들도 포함한 dataset으로 추후 이 점들을 제외한 데이터 사용
  //                   input.drop({ columns: ['260'], axis: 1, inplace: true });
  //                   const result = model.predict(input.tensor);
  //                   result.data().then(function(data) {
  //                       for (let i = 0; i < data.length; i++) {
  //                           if (data[i] <= 1 && data[i] > max) {
  //                               max = data[i];
  //                               max_id = i;
  //                           }
  //                       }
  //                       // 예측값(tensor)에서 최댓값과 인덱스 추출
  //                       console.log(max);
  //                       console.log(max_id);
  //                   });
  //               });
  //           });*/
  // let max = 0;
  // tf.loadLayersModel("../FaceShape-Model/model-JsonFile/my-model.json").then(
  //   function (model) {
  //     dfd
  //       .read_csv("../FaceShape-Model/dataset/norm-all-data.csv")
  //       .then(function (DATA) {
  //         input = DATA.loc({ rows: [14] });

  //         let encoder = new dfd.OneHotEncoder();
  //         let output = encoder.fit(DATA["260"]);
  //         console.log(output);
  //         // 현재는 볼 쪽의 점들도 포함한 dataset으로 추후 이 점들을 제외한 데이터 사용
  //         input.drop({ columns: ["260"], axis: 1, inplace: true });
  //         const rvalue = model.predict(input.tensor);
  //         rvalue.data().then(function (data) {
  //           for (let i = 0; i < data.length; i++) {
  //             if (data[i] <= 1 && data[i] > max) {
  //               max = data[i];
  //               max_id = i;
  //             }
  //           }
  //           // 예측값(tensor)에서 최댓값과 인덱스 추출
  //           console.log(max);
  //           console.log(max_id);
  //           let result = output.iloc({ columns: [String(max_id)] });
  //           //얼굴형을 string으로 넘겨준다.
  //           shape = result.columns[0];
  //           console.log(shape);
  //         });
  //       });
  //   }
  // );

  //================================
  return (
    <>
      <html>
        <head>
          <script src="https://cdn.jsdelivr.net/npm/danfojs@0.1.2/dist/index.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.4.0/dist/tf.min.js"></script>
        </head>
        <body></body>
      </html>
      <div className="App">
        <header>
          {/* <header className="App-header"> */}
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
              width: "50%",
              height: "40%",
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
              width: "50%",
              height: "40%",
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
    </>
  );
}

// import { saveAs } from "FileSaver";
// import { downcheck } from "Containers/FaceOutput";

// length = 130. dots for detecting face shape
var DOTS = [
  10,
  338,
  297,
  332,
  284,
  251,
  389,
  356,
  454,
  323,
  361,
  288,
  397,
  365,
  379,
  378,
  400,
  377,
  152,
  148,
  176,
  149,
  150,
  136,
  172,
  58,
  132,
  93,
  234,
  127,
  162,
  21,
  54,
  103,
  67,
  109,
  151,
  337,
  299,
  333,
  298,
  301,
  368,
  264,
  447,
  366,
  401,
  435,
  367,
  364,
  394,
  395,
  369,
  396,
  175,
  171,
  140,
  170,
  169,
  135,
  138,
  215,
  177,
  137,
  227,
  34,
  139,
  71,
  68,
  104,
  69,
  108,
];

// Drawing Mesh
const drawMesh = (predictions, ctx) => {
  // console.log("downcheck=" + downcheck);

  counter++;

  if (counter >= 5) {
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
          console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, 3 * Math.PI);
          ctx.fillStyle = "SpringGreen";
          ctx.fill();

          //z값 제외
          finalData.push(x);
          finalData.push(y);
        }
      }
      // create textfile for data modeling
      if (downcheck && pageIndex == 4) {
        // console.log("here");
        var blob = new Blob([finalData], { type: "text/plain;charset=utf-8" });
        // save txt file with photo file name
        saveAs(blob, "data.txt");
      }
    });
  }
};

export default FaceOutputContainer;
