import React from 'react';
import styled from 'styled-components'
import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer
class ResultButton extends React.Component{
	resultClick = () => {
    if(this.props.ManageFile.faceType === ""){
      alert('잠시 기다려 주세요.');
    } else {
      this.props.ManageFile.pageIndex = 7;
    }
  };
	
	render(){
		return(
			<Result onClick={this.resultClick}>
				<Font20>RESULT</Font20>
			</Result>
		);
	};
};

export default ResultButton;

const Font20 = styled.div`
	color: white;
	font-size: 20px;
	font-weight: bold;
`

const Result = styled.button`
	&:hover {
    cursor: pointer;
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
	color: white;
	background: #00cfbb;
	width: 120px;
	height: 40px;
	box-shadow: 3px 4px 5px 0 rgba(0, 0, 0, 0.5);
	border: none;
  border-radius: 30px;
	align-items: center;
  justify-content: space-around;
`