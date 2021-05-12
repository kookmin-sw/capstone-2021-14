import React from 'react';
import styled from 'styled-components'
import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer

class PrevButton extends React.Component{
	prevClick = () => {
    if (this.props.ManageFile.pageIndex === 3){
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