import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

@inject("ManageFile")
@observer
class FaceTypeContainer extends Component {
  render(){
    return(
      <>
        {this.props.ManageFile.faceType != "" &&
         <FaceType>
          당신의 얼굴형은 <p style={{display: 'inline-block', fontSize: '24px', color: 'blue', fontWeight: 'bold'}}> {this.props.ManageFile.faceType}</p>
          입니다.
        </FaceType> }
        {this.props.ManageFile.faceType == "" &&
          <>
            <div style={{ color: "white", cursor: "default"}}>
              당신의 <p fontWeight={"bold"} style={{ cursor: "default", color: "blue", display: "inline-block", fontWeight: "bold" }}>얼굴형</p>
              을 확인해보세요.
            </div>
            <p>인식중. . .</p>
            <p fontWeight={"bold"} fontSize={15} style={{cursor: "default",}}>약 1분정도 소요됩니다.</p>
          </>
        }
      </>
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
