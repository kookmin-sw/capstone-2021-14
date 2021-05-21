import React from "react";
import "./App.css";
// import styled from "styled-components";
// import * as tf from "@tensorflow/tfjs";
// import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// import Webcam from "react-webcam";
// import { drawMesh } from "./utilities";
//import { drawDot } from "./mask";
// import { getUserFace } from "./compare";

//Components
import HomeContainer from "./Containers/Home";

function App() {
  // const webcamRef = useRef(null);
  // const canvasRef = useRef(null);
  // //  Load posenet
  // const runFacemesh = async () => {
  //   const net = await facemesh.load(
  //     facemesh.SupportedPackages.mediapipeFacemesh
  //   );
  //   setInterval(() => {
  //     detect(net);
  //   }, 10);
  // };

  // const detect = async (net) => {
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Set canvas width
  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;

  //     const face = await net.estimateFaces({ input: video });
  //     console.log(face);

  //     // Get canvas context
  //     const ctx = canvasRef.current.getContext("2d");
  //     requestAnimationFrame(() => {
  //       drawMesh(face, ctx);
  //     });
  //   }
  // };

  // useEffect(()=>{runFacemesh()}, []);

  return (
    <div className="App">
      <header className="App-header">
        <HomeContainer />
      </header>
    </div>
  );
};

export default App;