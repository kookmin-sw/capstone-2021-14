import React from "react";
import styled from "styled-components";
import FaceOutputContainer from "./FaceOutput";
import FaceInputContainer from "./FaceInput";

import Container from "Components/Container";
import { observer, inject } from "mobx-react";
import FileUploadContainer from "./FileUpload";

@inject("ManageFile")
@observer
class EducationContainer extends React.Component {
  render() {
    const { ManageFile } = this.props;
    return (
      <>
        <FileUploadContainer></FileUploadContainer>

        {ManageFile.imageUrl != "" && <FaceOutputContainer />}
      </>
    );
  }
}

export default EducationContainer;
