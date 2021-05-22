import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

@inject("ManageFile")
@observer
class FaceTypeContainer extends Component {
  render(){
    return(
      <FaceType>당신의 얼굴형은 <p style={{display: 'inline-block', fontSize: '24px', color: 'blue', fontWeight: 'bold'}}>{this.props.ManageFile.faceType}</p>입니다.</FaceType>
    )
  }
}

export default FaceTypeContainer;

const FaceType = styled.p`
  font-size: 24px;
  cursor: default;
  ${'' /* font-weight: bold; */}
  ${'' /* color: 'green'; */}
`