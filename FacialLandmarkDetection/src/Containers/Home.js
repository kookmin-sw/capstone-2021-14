import React from "react";
import styled from "styled-components";
import FaceOutputContainer from "./FaceOutput";
import FaceInputContainer from "./FaceInput";
import InitialContainer from "./Init";
import RealtimeFaceOutputContainer from "./RealtimeFaceOutput";
import Container from "Components/Container";
import Content from "Components/Content";
import Header from "Components/Header";
import Footer from "Components/Footer";
import NextButton from "../Components/NextButton";
import PrevButton from "../Components/PrevButton";
import HomeButton from "../Components/HomeButton";
import { observer, inject } from "mobx-react";
import EducationContainer from "./Education";

export const appendScript = (scriptToAppend) => {
  const script = document.createElement("script");
  script.src = scriptToAppend;
  script.async = true;
  document.body.appendChild(script);
};

@inject("ManageFile")
@observer
class HomeContainer extends React.Component {
  state = {
    buttonIndex: 0,
  };

  picClick = () => {
    // alert("사진 업로드");
    // this.setState({ buttonIndex: 1 });
    this.props.ManageFile.pageIndex = 2;
  };

  camClick = () => {
    // alert("웹캠 사용");
    // this.setState({ buttonIndex: 2 });
    this.props.ManageFile.pageIndex = 3;
  };

  realTimeCamClick = () => {
    this.props.ManageFile.pageIndex = 6;
  };

  eduClick = () => {
    this.props.ManageFile.pageIndex = 5;
  };

  async componentDidMount() {
    const script = document.createElement("script");
    // scriptKakaoJS.id = "KakaoJSSDK";

    // script.id = "danfojs";
    // script.src = "//cdn.jsdelivr.net/npm/danfojs@0.1.2/dist/index.min.js";
    script.src = "//cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.4.0/dist/tf.min.js";

    script.async = true;

    // console.log(tf);
    // var a = fetch(
    //   "https://cdn.jsdelivr.net/npm/danfojs@0.1.2/dist/index.min.js"
    // ).then((res) => {
    //   console.log(res);
    //   console.log(res.body);
    //   return res;
    // });

    // console.log(a.input);
    // .then((res) => console.log(res))
    // console.log(a);
    document.body.appendChild(script);
    script.text = 'console.log("www");';

    // console.log(script.src);
    // console.log(script.id);
    // console.log(script);
    // script.src = "//cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.4.0/dist/tf.min.js";
    // document.body.appendChild(script);

    // console.log(tf);
    // let max = 0;
    // tf.loadLayersModel("./DeepLearningModel/my-model.json").then(function (
    //   model
    // ) {
    //   dfd.read_csv("./dataset/norm-all-data.csv").then(function (DATA) {
    //     input = DATA.loc({ rows: [14] });

    //     let encoder = new dfd.OneHotEncoder();
    //     let output = encoder.fit(DATA["260"]);
    //     console.log(output);
    //     // 현재는 볼 쪽의 점들도 포함한 dataset으로 추후 이 점들을 제외한 데이터 사용
    //     input.drop({ columns: ["260"], axis: 1, inplace: true });
    //     const rvalue = model.predict(input.tensor);
    //     rvalue.data().then(function (data) {
    //       for (let i = 0; i < data.length; i++) {
    //         if (data[i] <= 1 && data[i] > max) {
    //           max = data[i];
    //           max_id = i;
    //         }
    //       }
    //       // 예측값(tensor)에서 최댓값과 인덱스 추출
    //       console.log(max);
    //       console.log(max_id);
    //       let result = output.iloc({ columns: [String(max_id)] });
    //       //얼굴형을 string으로 넘겨준다.
    //       shape = result.columns[0];
    //       console.log(shape);
    //     });
    //   });
    // });
  }
  componentDidUpdate() {
    // alert("F");
  }
  render() {
    const { ManageFile } = this.props;
    return (
      <>
        {/* <FileUploadContainer/> */}
        <Container>
          <Header>
            <Font50>H A I!</Font50>
          </Header>
          <Content>
            {ManageFile.pageIndex == 0 && <InitialContainer />}
            {ManageFile.pageIndex == 1 && (
              <>
                {/* <Font50>분기 설정</Font50> */}
                <ButtonContainer>
                  <PicUploadButton onClick={this.picClick}>
                    <Font15>사진 업로드</Font15>
                  </PicUploadButton>
                  <WebcamButton onClick={this.camClick}>
                    <Font15>웹캠 캡쳐</Font15>
                  </WebcamButton>

                  <WebcamButton onClick={this.realTimeCamClick}>
                    <Font15>실시간 웹캠</Font15>
                  </WebcamButton>

                  <WebcamButton onClick={this.eduClick}>
                    <Font15>학습하기</Font15>
                  </WebcamButton>
                </ButtonContainer>
              </>
            )}
            {ManageFile.pageIndex == 2 && (
              <FaceInputContainer inputType={"file"} />
            )}
            {ManageFile.pageIndex == 3 && (
              <FaceInputContainer inputType={"cam"} />
            )}
            {ManageFile.pageIndex == 4 && <FaceOutputContainer />}
            {ManageFile.pageIndex == 5 && <EducationContainer />}
            {ManageFile.pageIndex == 6 && <RealtimeFaceOutputContainer />}
          </Content>
          <ButtonContainer>
            {ManageFile.pageIndex != 0 && ManageFile.pageIndex != 4 && (
              <PrevButton />
            )}
            {ManageFile.pageIndex != 1 &&
              ManageFile.pageIndex != 2 &&
              ManageFile.pageIndex != 4 &&
              ManageFile.pageIndex != 3 && <NextButton />}
            {ManageFile.pageIndex == 4 && <HomeButton />}
          </ButtonContainer>
          <Footer>
            <Font15>Robolink AI web app free trial</Font15>
          </Footer>
        </Container>
      </>
    );
  }
}

export default HomeContainer;

const ButtonContainer = styled.div`
  width: 90%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PicUploadButton = styled.button`
  color: black;
  width: 120px;
  height: 40px;
  background-color: #007166;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const WebcamButton = styled.button`
  color: black;
  width: 120px;
  height: 40px;
  background-color: #007166;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
`;

const Font50 = styled.div`
  color: #fdffd5;
  font-size: 50px;
  font-weight: bold;
`;

const Font15 = styled.div`
  color: #fdffd5;
  font-size: 15px;
  font-weight: bold;
`;
