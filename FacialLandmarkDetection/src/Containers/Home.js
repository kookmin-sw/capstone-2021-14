import React from "react";
import styled from "styled-components";
import FileUploadContainer from "./FileUpload";
import FaceInputContainer from "./FaceInput";

class HomeContainer extends React.Component {
  render() {
    //

    return (
      <>
        <FileUploadContainer />
        <FaceInputContainer></FaceInputContainer>
      </>
    );
  }
}

export default HomeContainer;
