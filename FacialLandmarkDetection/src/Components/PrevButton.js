import React from 'react';
import styled from 'styled-components'
import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer

class PrevButton extends React.Component{
	prevClick = () => {
		const pIndex = this.props.ManageFile.pageIndex;
    if (pIndex === 3 || pIndex === 5 || pIndex === 6){
      this.props.ManageFile.pageIndex = 1;
    } else {
      this.props.ManageFile.pageIndex = this.props.ManageFile.pageIndex - 1;
    }
    
  };
	
	render(){
		return(
			<Prev onClick={this.prevClick}>
				<Font20>PREV</Font20>
			</Prev>
		);
	};
};

export default PrevButton;

const Font20 = styled.div`
	color: white;
	font-size: 20px;
	font-weight: bold;
`

const Prev = styled.button`
	&:hover {
    cursor: pointer;
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
	color: white;
	background-color: #00cfbb;
	width: 120px;
	height: 40px;
	box-shadow: 3px 4px 5px 0 rgba(0, 0, 0, 0.5);
	border: none;
  border-radius: 30px;
	align-items: center;
  justify-content: space-around;
`