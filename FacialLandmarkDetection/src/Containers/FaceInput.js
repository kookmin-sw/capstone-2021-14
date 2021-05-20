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
      if(this.props.ManageFile.imageUrl === ""){
        if(this.props.inputType === "file"){
          alert("사진을 업로드 해주세요.");
        } else {
          alert("사진을 캡쳐 해주세요.");
        }
      } else{
        this.props.ManageFile.pageIndex = 4;
      }

      // alert(this.props.ManageFile.pageIndex);
    };

    return (
      <>
        {/* {this.props.ManageFile.pageIndex} */}
        {inputType == "file" ? (
          <FileUploadContainer />
        ) : (
          <CamUploadContainer />
        )}

        <ConfirmButton onClick={ConfirmButtonClick}>
          <Font15>확인!</Font15>
        </ConfirmButton>
      </>
    );
  }
}

export default FaceInputContainer;

const ConfirmButton = styled.button`
	&:hover {
    cursor: pointer;
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  background-color: #19c6dd;
  ${'' /* border: 1px solid gray; */}
  box-shadow: 3px 4px 5px 0 rgba(0, 0, 0, 0.5);
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  height: 35px;
  width: 60px;
  justify-content: center;
  align-items: center;
  border: none;
`;

const Font15 = styled.div`
  color: white;
  font-size: 15px;
  ${'' /* font-weight: bold; */}
`