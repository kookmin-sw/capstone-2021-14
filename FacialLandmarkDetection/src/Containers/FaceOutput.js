import React, { useRef, useState } from "react";
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
//import { loadLayersModel, tensor } from "@tensorflow/tfjs";
import ManageFile from "stores/ManageFile";
//import { read_csv, OneHotEncoder } from "danfojs-node";
// import { Series, DataFrame } from 'pandas-js';

//dfd.read_csv('../FaceShape-Model/dataset/Standardization_Data.csv');
/*const csvUrl = 'https://seonjongyoo.github.io/ModelServer/Standardization_Data.csv';
async function run() {
  const csvDataset = tf.data.csv(csvUrl)

// then you can use your dataset
  console.log(csvDataset);
  console.log((await csvDataset.columnNames()).length-1);
  
  const flattenedDataset =
     csvDataset
     .map(({xs, ys}) =>
       {
         // Convert xs(features) and ys(labels) from object form (keyed by
         // column name) to array form.
         return {xs:Object.values(xs), ys:Object.values(ys)};
       })
     .batch(10);
  console.log("hh", flattenedDataset);

}

run();
*/



// @inject("ManageFile")
// @observer
export var downcheck = null;
function useStores() {
  return React.useContext(MobXProviderContext);
}
let counter = 0;
let intervalId;
let pageIndex;
const FaceType = ["둥근형", "계란형", "역삼각형", "각진형"];
let Input_image;

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
    const image = imageRef.current;
    //const gantTensor = tf.browser.fromPixels(image);
    // console.log(gantTensor.shape.print);
    //const test = gantTensor.print();
    //console.log(test);

    //const values = gantTensor.arraySync();
    Input_image = image;
    //const arr = Array.from(values);
    //console.log(values);

    //console.log(arr);


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
      <div style={{ color: "white", cursor: "default"}}>
        당신의 <p fontWeight={"bold"} style={{ cursor: "default", color: "blue", display: "inline-block", fontWeight: "bold" }}>얼굴형</p>
        을 확인해보세요.
      </div>
      {/* <p>{!isDetected ? '인식중...' : '인식 완료'}</p> */}
      <p>인식중. . .</p>
      <p fontWeight={"bold"} fontSize={15} style={{cursor: "default",}}>약 1분정도 소요됩니다.</p>      
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

var DOTS_Border = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 
  379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 
  234, 127, 162, 21, 54, 103, 67, 109 
]

var MEAN = [
  317.34608396402996, 166.06748173014324, 157.0257360159556, 241.91657093048096, 
  152.02372121747334, 311.2839751586914, 170.4475929705302, 213.58675669606527, 
  169.30214713637034, 457.51412580362955, 229.53178845850627, 175.15323890050252, 
  181.07767672602336, 230.81779460906984, 239.28567277526855, 207.8930090560913, 
  166.59509213129678, 253.52876215871174, 153.5357890958786, 379.96588117980957, 
  193.26865617307027, 190.7146961593628, 204.10334443283082, 214.7880198465983, 
  275.7211608505249, 206.39639033253988, 269.5266644592285, 167.64156993103026, 
  148.92142725785573, 309.1280487162272, 158.80792847855886, 417.90442963663736,
  198.84889134979247, 494.81708810424806, 202.1571542599996, 513.1226370747884, 
  151.70107823181152, 377.6063846791585, 179.56805412419638, 473.8194097391764, 
  158.8962929534912, 280.0028097890218, 260.4949598083496, 550.8297864786783, 
  288.1819505513509, 572.9071379699707, 244.22648123931884, 549.9100770161947, 
  225.061201616923, 534.5404442749024, 317.42787222798665, 206.9501277364095, 
  318.5821722462972, 576.0710872294109, 150.45824812221528, 271.9005940806071,
  220.18807433827718, 516.0503543904622, 239.82092828877768, 533.4431387125651, 
  286.8116517791748, 562.6737873331706, 184.34668963305157, 489.3863490600586, 
  318.56505517578125, 565.8208261210124, 264.46693630218505, 563.4458883361816, 
  156.20739807097118, 412.4601502126058, 164.39126594034832, 444.6346648050944, 
  150.04865044403076, 344.2158627217611, 151.2033703368505, 344.3607885538737, 
  477.7538183186849, 241.41879135894774, 482.9306268412272, 310.60292544555665, 
  464.1548187866211, 213.20565973154703, 466.5794129740397, 456.73617039998373, 
  405.12961053975425, 174.99809284464519, 453.46208989461263, 230.74870049031574, 
  395.3662155609131, 208.00842064666747, 468.1033574523926, 253.37236525980632, 
  481.81780423990887, 379.20133503723144, 441.3447464090983, 190.50639233398437, 
  430.43637685139976, 214.87964322153726, 358.99613565063476, 206.39670866902668, 
  365.1606446431478, 167.57392410151164, 486.01041860961914, 308.4870539194743, 
  476.8055197652181, 417.1543997701009, 437.5035538431803, 494.2020725402832, 
  434.2717408650716, 512.5704053446452, 483.5947680257161, 376.8029037475586, 
  456.57048259480797, 473.125716603597, 475.9887866007487, 279.5459447072347, 
  376.22863101704917, 550.5067538045247, 348.8283382212321, 572.728564839681, 
  392.4418057403565, 549.5256258443196, 411.51973177083335, 534.1120732828776,
   484.29481705729165, 271.27189119466146, 416.3528746236165, 515.5365902811686, 
   396.8501129353841, 532.968368754069, 350.10177892049154, 562.4891808064779, 
   451.74631993611655, 488.7482022603353, 372.3684156443278, 563.1677513631184, 
   479.3429757283529, 411.63648298136394, 471.46035475667315, 443.9130698140462, 
   484.9816535135905, 343.4966476389567, 483.9438695576986, 343.61728351338706
]

var ST = [
  91.51316450674028, 32.19365558039298, 91.58736614373639, 35.77037781342411, 
  91.26912746187651, 35.90570808601237, 91.52087888815228, 35.15814505368065, 
  92.7321737667774, 38.615424698343155, 91.48626778281967, 33.382408436216785, 
  91.03621430410995, 34.45072094546629, 90.92041808688288, 32.84635078353417, 
  91.10125004821853, 34.99749817219344, 92.09288291372904, 37.49810158439254, 
  91.50164972607185, 34.3791738614211, 90.98878468453773, 33.74791232555571, 
  90.88871742523011, 32.17403102594927, 91.50378998399142, 32.613563734284384, 
  91.80685625053347, 36.70727343734981, 92.37010179188805, 38.05746718745477, 
  92.49749110972141, 37.584952732553354, 93.0654163404695, 38.70414800979893, 
  91.48618592434359, 36.645750308638185, 92.40907827319448, 37.699863662155586, 
  91.15962179362688, 35.39356555447614, 93.22406487784485, 38.406624281359264, 
  93.81549436310208, 39.362537690766075, 93.37413125916089, 38.9395750466991, 
  93.2097498918948, 38.75906869171682, 90.89364287211065, 31.818901960691797, 
  93.9865671122444, 39.42184938440696, 91.67398836964112, 36.247398655764314, 
  92.67957336684947, 37.706689566549734, 92.91254638934501, 37.971157067898304, 
  93.49570915290785, 38.67874867061808, 92.95663849472963, 38.7652078721465, 
  93.66002118186594, 38.757283136761046, 93.59366608144026, 39.1867709972003, 
  91.82075405585438, 37.16640711504066, 92.16635163622357, 37.611410919926, 
  91.31458874330583, 36.26369771413821, 91.9279064789127, 37.05851305889599, 
  91.7098622929472, 35.641894774000384, 91.5174886021571, 35.89839246920571, 
  91.66799777309424, 34.91466909824355, 93.16149860901119, 38.954169725874365, 
  91.62005246292846, 33.09258551497097, 91.24277698866949, 34.18489955944353, 
  91.08390813191713, 32.59353850356152, 91.28089510911164, 34.81466097899405, 
  92.3994978152966, 37.751667318407094, 91.65675034085342, 34.066577637831706, 
  91.20263692652605, 33.45191149083333, 90.98189772334625, 32.02054548488021, 
  91.57862758629793, 32.42918689593486, 91.98805399805717, 36.802964158594996, 
  92.75361958782972, 38.366142547597626, 92.97303224941722, 37.779727133238964, 
  93.5847615046641, 39.01208728828013, 91.80535230539778, 36.75008995517343, 
  92.82384534090365, 37.92639779849057, 91.35267454198184, 35.300687324498746, 
  93.61272191093676, 38.56903697481455, 94.06848220994712, 39.463226735553526, 
  93.88435426256925, 39.17236904054177, 93.76498159457277, 39.037152787175856, 
  91.79696597578375, 36.21999976479958, 93.20625263879252, 37.90494080295896, 
  93.39979941194947, 38.16059660964369, 93.73046343638693, 38.77034121751527, 
  93.41636499316762, 39.09774662552307, 94.00524111690358, 39.35894932296075, 
  92.1681170068911, 37.34406806890641, 92.55669915665285, 37.84073465510624, 
  91.61551072899658, 36.31096074286701, 92.16752870943432, 37.24320600124049
]

function preprocess(img)
{
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
        //console.log("here")
        //console.log(keypoints[i][0], keypoints[i][1]);
        //console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
        const [x, y, z] = keypoints[i];
        result = DOTS_Border.includes(i);
        if (result) {
          //console.log("here")
          //console.log(keypoints[i][0], keypoints[i][1]);
          //console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          //ctx.beginPath();
          //ctx.arc(x, y, 1.7, 0, 3 * Math.PI);
          //ctx.fillStyle = "SpringGreen";
          //ctx.fill();

          //z값 제외
          finalData.push(x);
          finalData.push(y);
        }
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, 3 * Math.PI);
        ctx.fillStyle = "SpringGreen";
        ctx.fill();
      }
      //put Keypoints to Shape Model
      if (downcheck) {
        //for (let i = 0; i < finalData.length; i++) {
        //  finalData[i] = (finalData[i]-MEAN[i])/ST[i];
        //}
        //const csvDataset = tf.data.csv(csvUrl);
        /*let sum = 0.0;
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
        }*/
        //console.log(finalData);
        //console.log(Input_image);
        // 추출한 좌표를 Shape Model의 input으로 넣는다.
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

      // create textfile for data modeling
      if (downcheck && pageIndex == 5) {
        //console.log("finalData: ", finalData);

        // console.log("here");
        var blob = new Blob([finalData], { type: "text/plain;charset=utf-8" });
        // save txt file with photo file name
        saveAs(blob, "data.txt");
      }
      /*console.log(keypoints[234][0], keypoints[234][1]);
      console.log(keypoints[454][0], keypoints[454][1]);
      console.log(keypoints[10][0], keypoints[10][1]);
      console.log(keypoints[152][0], keypoints[152][1]);*/
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