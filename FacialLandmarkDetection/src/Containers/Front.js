import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

@inject("ManageFile")
@observer
class FrontContainer extends Component {
  render(){
    return(
      <>
        {/* {this.props.ManageFile.faceType != "" && <FaceType>당신의 얼굴형은 <p style={{display: 'inline-block', fontSize: '24px', color: 'blue', fontWeight: 'bold'}}>{this.props.ManageFile.faceType}</p>입니다.</FaceType> } */}
        {this.props.ManageFile.isFront === true && <IsFront>얼굴이 정면을 향해 있습니다.</IsFront>}
        {this.props.ManageFile.isFront === false && <IsFront>얼굴을 정면을 향해 맞춰주세요.</IsFront>}
      </>
    )
  }
}

export default FrontContainer;

const IsFront = styled.p`
  font-size: 24px;
  cursor: default;
  ${'' /* font-weight: bold; */}
  ${'' /* color: 'green'; */}
`