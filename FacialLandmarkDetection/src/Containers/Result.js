import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import samples from '../pic';

const rePic = [[[samples.ManCirRe1,samples.ManCirRe2],// man cir
[samples.ManRecRe1, samples.ManRecRe2], // man rec
[samples.ManTriRe1, samples.ManTriRe2], // man tri
[samples.ManEggRe1, samples.ManEggRe2]], // man egg
[[samples.WomanCirRe1, samples.WomanCirRe2], // woman circle
[samples.WomanRecRe1, samples.WomanRecRe2], // woman rec
[samples.WomanTriRe1, samples.WomanTriRe2], // woman tri
[samples.WomanEggRe1, samples.WomanEggRe2]]]; //woman egg

const norePic = [[[samples.ManCirNRe1,samples.ManCirNRe1],// man cir
[samples.ManRecNRe1, samples.ManRecNRe2], // man rec
[samples.ManTriNRe1, samples.ManTriNRe2],
[" "," "]], // man tri
[[samples.WomanCirNRe1, samples.WomanCirNRe2], // woman circle
[samples.WomanRecNRe1, samples.WomanRecNRe2], // woman rec
[samples.WomanTriNRe1,samples.WomanTriNRe2],
[" "," "]]]; // woman tri

const reText = [[["가르마를 타서 자연스러운 웨이브 연출","얼굴의 세로선을 강조해 길어보이게 하는 크롭컷"],// man cir
["턱이 부각되지 않게 시선을 머리 위쪽으로 분산시키는 포마드", "이마를 드러내고 머리를 위로 올리는 리젠트 스타일"], // man rec
["얼굴 면적을 작게 해주고 균형감을 주는 댄디컷","옆 볼륨이 많이 생겨 밸런스를 주는 리프컷"], // man tri
["모든 헤어스타일이 적절하게 매치되는 얼굴형","모든 헤어스타일이 적절하게 매치되는 얼굴형"]], // man egg
[["얼굴형이 슬림해 보이게 해주는 엘리자벳펌","앞머리 양이 적어 시선을 턱선으로 가게 해주는 시스루뱅"], // woman circle
["시선을 위로 분산시키는 처피뱅","강한 인상을 보안하는 웨이브펌"], // woman rec
["앞머리 라인이 부드러워 긴 얼굴을 커버하는 프릴펌","차가운 인상을 주는 얼굴형을 보안하는 보니펌"], // woman tri
["모든 헤어스타일이 적절하게 매치되는 얼굴형","모든 헤어스타일이 적절하게 매치되는 얼굴형"]]]; // woman egg

const noreText = [[["얼굴이 짧아 보이고 가로를 부각시키는 눈썹 가리는 헤어 비추천","얼굴이 짧아 보이고 가로를 부각시키는 눈썹 가리는 헤어 비추천"], // man cir
["시선을 하관으로 부각시키는 댄디컷 비추천","턱이 부각되는 장발 비추천"], // man rec
["윗 볼륨과 뒷 기장이 길어져 세로폭이 부각되는 테일컷 비추천","긴 얼굴형이 부각되는 포마드 비추천"], // man tri
[" "," "]], 
[["앞머리가 있으면 더 둥글게 보이므로 비추천","얼굴이 더 커보이는 볼륨 없는 일자 머리 비추천"], // woman circle
["뱅 스타일 시 앞머리를 무겁게 내리면 하관이 길어보이므로 비추천","시선이 하관으로 집중되는 5:5 가르마 비추천"], // woman rec
["하관이 부각되는 스트레이트 헤어 비추천","넓은 이마와 좁은 턱이 부각되는 5:5가르마와 생머리 비추천"], // woman tri
[" "," "]]]; 

@inject("ManageFile")
class ResultContainer extends Component{
  state={
    genderIndex: 0,
    seqIndex: 0,
    faceIndex: 0,
  };

  componentDidMount(){
    this.setState({
      genderIndex: this.props.ManageFile.genderButtonIndex - 1,
    });
    if(this.props.ManageFile.faceType === "둥근형"){
      this.setState({
        faceIndex: 0,
      });
    } else if(this.props.ManageFile.faceType === "각진형"){
      this.setState({
        faceIndex: 1,
      });
    } else if(this.props.ManageFile.faceType === "역삼각형"){
      this.setState({
        faceIndex: 2,
      });
    } else {
      this.setState({
        faceIndex: 3,
      });
    }
    // console.log(rePic[this.state.genderIndex][this.state.faceIndex][this.state.seqIndex]);
    // console.log(norePic[this.state.genderIndex][this.state.faceIndex][this.state.seqIndex]);
    // console.log(this.state.seqIndex);
  }

  nextSample = () => {
    if(this.state.seqIndex == 0){
      this.setState({seqIndex: 1});
    } else {
      this.setState({seqIndex: 0});
    }
  }

  render(){
    return(
      <>
        <FaceType>
          당신의 얼굴형은 <p style={{display: 'inline-block', fontSize: '24px', color: 'blue', fontWeight: 'bold'}}> {this.props.ManageFile.faceType}</p>
          입니다.
        </FaceType>
        <ImagesContainer>
          {/* <ResultImage src={this.state.resultImg} /> */}
          <SampleImageContainer>
            <Font24>추천 헤어스타일</Font24>
            <SampleImage src={rePic[this.state.genderIndex][this.state.faceIndex][this.state.seqIndex]} />
              <TextFont>
                {reText[this.state.genderIndex][this.state.faceIndex][this.state.seqIndex]}
              </TextFont>
          </SampleImageContainer>
          {this.state.faceIndex !== 3 && (<SampleImageContainer>
            <Font24>비추천 헤어스타일</Font24>
            <SampleImage src={norePic[this.state.genderIndex][this.state.faceIndex][this.state.seqIndex]} />
              <TextFont>
                {noreText[this.state.genderIndex][this.state.faceIndex][this.state.seqIndex]}
              </TextFont>
          </SampleImageContainer>)}
        </ImagesContainer>
        {/* <TextFont>{this.state.text}</TextFont> */}
        <NextSample onClick = {this.nextSample}>
          <Font24>
            {">>>"}
          </Font24>
        </NextSample>
      </>
    )
  }
}

export default ResultContainer;

const FaceType = styled.p`
  font-size: 24px;
  cursor: default;
`

const ImagesContainer = styled.div`
  display: flex;
  @media screen and (min-width: 0px) and (max-width: 1023.98px) {
    flex-direction: column;
    justify-content : center;
  };
  
  @media screen and (min-width: 1024px){
    flex-direction: row;
    justify-content : space-around;

  };
  width: 100%;
  align-items: center;
  margin-bottom: 18px;
  ${'' /* background: #ff0000; */}
`

const Font24 = styled.div`
	color: white;
	font-size: 24px;
	font-weight: bold;
`
const TextFont = styled.p`
	color: white;
  @media screen and (min-width: 0px) and (max-width: 1023.98px) {
    font-size: 14px;
    width: 100%;
  };
  
  @media screen and (min-width: 1024px){
    font-size: 18px;
    width: 95%;
  };
	font-weight: bold;
  cursor: default;
  ${'' /* justify-content: center;
  align-items: center; */}
  text-align: center;
`
const SampleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 0px) and (max-width: 1023.98px) {
    width: 70%;
  };
  
  @media screen and (min-width: 1024px){
    width: 50%;
  };
  align-items: center;
  justify-content: center;
  ${'' /* background: #00ff00; */}
`

const SampleImage = styled.img`
  @media screen and (min-width: 0px) and (max-width: 1023.98px) {
    width: 100%;
    margin-top: 6px;
  };
  
  @media screen and (min-width: 1024px){
    width: 90%;
  };
`

const NextSample = styled.button`
  width: 120px;
	height: 40px;
  &:hover {
    cursor: pointer;
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  color: white;
	background: #00cfbb;
	box-shadow: 3px 4px 5px 0 rgba(0, 0, 0, 0.5);
	border: none;
  border-radius: 30px;
	align-items: center;
  justify-content: space-around;
`