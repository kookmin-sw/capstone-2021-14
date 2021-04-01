import React from "react";
import styled from "styled-components";
import FileUploadContainer from "./FileUpload";
import CamUploadContainer from "./CamUpload";
import Container from "Components/Container";
import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer
class FaceInputContainer extends React.Component {
  state = {
    f: 0,
  };
  render() {
    const { inputType } = this.props;

    const ConfirmButtonClick = () => {
      this.props.ManageFile.pageIndex = 3;
      // alert(this.props.ManageFile.pageIndex);
    };

    return (
      <>
        {/* {this.props.ManageFile.pageIndex} */}
        <Container>
          {inputType == "file" ? (
            <FileUploadContainer />
          ) : (
            <CamUploadContainer />
          )}

          <ConfirmButton onClick={ConfirmButtonClick}>확인!</ConfirmButton>
        </Container>
      </>
    );
  }
}

export default FaceInputContainer;

const ConfirmButton = styled.div`
  background-color: green;
  border: 1px solid gray;
  padding: 5px 10px 5px 10px;
`;
