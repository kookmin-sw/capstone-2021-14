import React from "react";
import styled, { css } from "styled-components";

class FaceCheckContainer extends React.Component {
  state = {
    isFront: this.props.type,
  };

  componentDidMount() {
    this.setState({ isFront: this.props.type });
  }

  componentWillReceiveProps() {
    this.setState({ isFrot: this.props.type });
  }

  render() {
    console.log("Hello");
    console.log(this.state.isFront);
    return <>{this.state.isFront} 입니다!</>;
  }
}

export default FaceCheckContainer;
