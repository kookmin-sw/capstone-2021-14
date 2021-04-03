import {saveAs} from "FileSaver";

// 버튼 클릭 확인 함수
var flag = false;
export const checkClick = (check) => {
  if (check) {
    flag = true;
  }
};

var downflag = false;

// Drawing Mesh
export var userFace = new Array(3);
var cnt = 0;
export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    
    //console.log(predictions);

    // 버튼을 클릭한 순간 그때의 "shilhouette 정보를 저장한다."
    if (flag) {
      console.log("here");
      userFace[0] = predictions[0]["annotations"]["silhouette"];
      userFace[1] = predictions[0]["annotations"]["leftCheek"];
      userFace[2] = predictions[0]["annotations"]["rightCheek"];
      console.log("userFace: ", userFace);
      flag = false;
    }

    cnt += 1;
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;
      // Draw Dots
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];
        if (cnt < 11) {
          console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
        }
        //Pointlist.push(x);
        //Pointlist.push(y);
        //Pointlist.push(z);

        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, 3 * Math.PI);
        ctx.fillStyle = "SpringGreen";
        ctx.fill();
      }
      // create textfile for data modeling
    if(downflag == false){
      var blob = new Blob([keypoints], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "data.txt");
      downflag = true;
    }
    });
    
  }
};