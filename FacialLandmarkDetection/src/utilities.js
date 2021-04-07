import { saveAs } from "FileSaver";

// length = 130. dots for detecting face shape
export var DOTS = [
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

// txt파일 다운로드 체크
var downflag = false;

// Drawing Mesh
export const drawMesh = (predictions, ctx) => {
  console.log("drawmesh!!!!");
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

          finalData.push(keypoints[i]);
        }
      }
      // create textfile for data modeling

      // if(downflag == false){
      //   var blob = new Blob([finalData], {type: "text/plain;charset=utf-8"});
      //   saveAs(blob, "data.txt");
      //   downflag = true;
      // }
    });
  }
};
