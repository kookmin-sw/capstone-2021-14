import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import result2 from './faceSample2.png';
import result3 from './faceSample3.png';
import samples from '../pic';

@inject("ManageFile")
class ResultContainer extends Component{
  state={
    resultImg: null,
    imgIndex: 0,
    text: "",
  }

  componentDidMount(){
    if(this.props.ManageFile.faceType === "둥근형"){
      if(this.props.ManageFile.genderButtonIndex === 1){
        this.setState({
          resultImg: samples.ManCir1,
          text: "가르마를 타서 자연스러운 웨이브 연출"
        });
      } else {
        this.setState({
          resultImg: samples.ManRec1,
          text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일"
        });
      }
    }
    else if(this.props.ManageFile.faceType === "계란형"){
      if(this.props.ManageFile.genderButtonIndex === 1){
        this.setState({
          resultImg: samples.ManRec1,
          text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일"
        });
      } else {
        this.setState({
          resultImg: samples.ManRec1,
          text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일"
        });
      }
    }
    else if(this.props.ManageFile.faceType === "역삼각형"){
      if(this.props.ManageFile.genderButtonIndex === 1){
        this.setState({
          resultImg: samples.ManTri1,
          text: "얼굴 면적을 작게 해주면서 얼굴 형태에 균형감을 주는 댄디컷"
        });
      } else {
        this.setState({
          resultImg: samples.ManTri1,
          text: "얼굴 면적을 작게 해주면서 얼굴 형태에 균형감을 주는 댄디컷"
        });
      }
    }
    else{
      if(this.props.ManageFile.genderButtonIndex === 1){
        this.setState({
          resultImg: samples.ManRec1,
          text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일"
        });
      } else {
        this.setState({
          resultImg: samples.ManRec1,
          text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일"
        });
      }
    }
  }

  nextSample = () => {
    if(this.props.ManageFile.faceType === "둥근형"){
      if(this.props.ManageFile.genderButtonIndex === 1){ // 남자 둥근
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManCir2,
            text: "볼살이 많지 않다면 갸름해 보이는 느낌을 주는 리젠트 스타일",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 2,
          });
        } else {
          this.setState({
            resultImg: samples.ManCir1,
            text: "가르마를 타서 자연스러운 웨이브 연출",
            imgIndex: 0,
          });
        }
      } else { // 여자 둥근
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 2,
          });
        } else {
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 0,
          });
        }
      }
    }
    else if(this.props.ManageFile.faceType === "계란형"){
      if(this.props.ManageFile.genderButtonIndex === 1){ // 남자 계란
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 2,
          });
        } else {
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 0,
          });
        }
      } else { // 여자 계란
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 2,
          });
        } else {
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 0,
          });
        }
      }
    }
    else if(this.props.ManageFile.faceType === "역삼각형"){
      if(this.props.ManageFile.genderButtonIndex === 1){ // 남자 역삼
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManTri2,
            text: "얼굴형의 밸런스를 잡도록 옆 볼륨이 많은 리프컷",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManTri3,
            text: "얼굴형의 밸런스를 잡도록 옆 볼륨이 많은 리프컷",
            imgIndex: 2,
          });
        } else if(this.state.imgIndex === 2){
          this.setState({
            resultImg: samples.ManTri4,
            text: "시선을 측면으로 분산시켜 좁아 보이는 얼굴형을 보안해주는 가르마펌",
            imgIndex: 3,
          });
        } else {
          this.setState({
            resultImg: samples.ManTri1,
            text: "얼굴 면적을 작게 해주면서 얼굴 형태에 균형감을 주는 댄디컷",
            imgIndex: 0,
          });
        }
      } else { // 여자 역삼
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 2,
          });
        } else {
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 0,
          });
        }
      }
    }
    else{
      if(this.props.ManageFile.genderButtonIndex === 1){ // 남자 각진
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 2,
          });
        } else {
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 0,
          });
        }
      } else { // 여자 각진
        if(this.state.imgIndex === 0){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 1,
          });
        } else if(this.state.imgIndex === 1){
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 2,
          });
        } else {
          this.setState({
            resultImg: samples.ManRec1,
            text: "턱이 부각되지 않도록 시선을 머리 위로 분산시키는 포마드 스타일",
            imgIndex: 0,
          });
        }
      }
    }
  }
  
  render(){
    return(
      <>
        <ImagesContainer>
          <UserImage src={this.props.ManageFile.imageUrl} />
          <ResultImage src={this.state.resultImg} />
        </ImagesContainer>
        <TextFont>{this.state.text}</TextFont>
        <NextSample onClick = {this.nextSample}>
          <Font20>
            {">>>"}
          </Font20>
        </NextSample>
      </>
    )
  }
}

export default ResultContainer;

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
`

const Font20 = styled.div`
	color: white;
	font-size: 20px;
	font-weight: bold;
`
const TextFont = styled.p`
	color: white;
  @media screen and (min-width: 0px) and (max-width: 1023.98px) {
    font-size: 12px;
  };
  
  @media screen and (min-width: 1024px){
    font-size: 16px;
  };
	font-weight: bold;
  cursor: default;
`

const UserImage = styled.img`
  @media screen and (min-width: 0px) and (max-width: 1023.98px) {
    width: 60%;
    margin-bottom: 6px;
  };
  
  @media screen and (min-width: 1024px){
    width: 45%;
  };
`

const ResultImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #00ff00;
  width: 100%;
  alignItems: center;
  justify-content: space-around;
  margin-top: 18px;
  margin-bottom: 24px;
`

const ResultImage = styled.img`
  @media screen and (min-width: 0px) and (max-width: 1023.98px) {
    width: 60%;
    margin-top: 6px;
  };
  
  @media screen and (min-width: 1024px){
    width: 45%;
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