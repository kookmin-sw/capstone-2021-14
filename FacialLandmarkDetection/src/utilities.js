// 3개씩 삼각형을 형성한다.
// 127-34-139, 11-0-232, ...

var flag = false;
export const checkClick = (check) => {
  if (check) {
    flag = true;
  }
};

// Drawing Mesh 
export var userFace = null;
export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {

    // 버튼을 클릭한 순간 그때의 "shilhouette 정보를 저장한다."
    if (flag) {
      console.log("here");
      userFace = predictions[0]["annotations"]["silhouette"];
      console.log("userFace: ", userFace);
      flag = false;
    }

    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;

      // Draw Dots
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];

        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, 3 * Math.PI);
        ctx.fillStyle = "SpringGreen";
        ctx.fill();
      }
    });
  }
};