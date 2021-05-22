import React from "react";
import styled from "styled-components";

import Container from "Components/Container";

import { observer, inject } from "mobx-react";

@inject("ManageFile")
@observer
class FileUploadContainer extends React.Component {
  state = {
    file: "",
    previewURL: "",
  };
  onChangeFile = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    this.props.ManageFile.fileName = e.target.files[0].name;
    reader.onloadend = () => {
      this.props.ManageFile.imageUrl = reader.result;
      this.setState({
        file: file,
        previewURL: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
  // onChangeFile = (e) => {
  //   const { ManageFile } = this.props;

  //   let fileNameAvailable = ["png", "jpg", "jpeg"];
  //   let fileName;
  //   if (e.currentTarget.files[0]) {
  //     if (
  //       !fileNameAvailable.includes(
  //         e.currentTarget.files[0].name.split(".")[e.currentTarget.files.length]
  //       )
  //     ) {
  //       return alert("파일 확장자명 (png, jpg, jpeg만 가능) 을 확인해주세요.");
  //     }
  //     fileName = e.currentTarget.files[0].name;
  //     ManageFile.imageFile = e.currentTarget.files[0];
  //     console.log(ManageFile.imageFile)
  //     // document.getElementById('FileInput').select();
  //     const temp=document.getElementById('FileInput')
  //     temp.select();
  //     // console.log(document.getSelection)
  //     // console.log(temp)
  //     console.log(ManageFile.imageFile.name);

  //     this.setState({f:3})
  //   }
  // };
  render() {
    return (
      <>
      {/* // <Container> */}
        <Font30>파일을 업로드 해 주세요</Font30>

        <FileSelect
          onClick={() => document.getElementById("FileInput").click()}
        >
          <Font16>업로드</Font16>
          {/* <img src={fileImage} /> */}
          <input
            id="FileInput"
            type="file"
            style={{
              display: "none",
            }}
            onChange={(e) => this.onChangeFile(e)}
          />
        </FileSelect>
        {this.state.previewURL && this.props.ManageFile.pageIndex != 4 && (
          <img src={this.state.previewURL} style={{width: '480px', height: 'auto', marginTop: '15px', marginBottom: '15px'}} />
        )}

        {/* {ManageFile.imageFile && <img src={require('./'+ManageFile.imageFile.name)}/>} */}
        {/* <img src={require('./face_540.jpg')}/> */}
      {/* // </Container> */}
      </>
    );
  }
}

export default FileUploadContainer;

const FileSelect = styled.div`
  border: none;
  width: 686px;
  height: 46px;
  ${'' /* width: 50%; */}
  ${'' /* height: 20%; */}
  background-color: #00cfbb;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  ${'' /* margin-bottom: 20px; */}
  justify-content: center;
  outline: 0;
  border: ${(props) => (props.active ? "solid 2px #0933b3" : "none")};
  &:hover {
    cursor: pointer;
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  > input {
    width: 100%;
    height: 100%;
  }
  > img {
    margin-left: 10px;
  }
`;
const Font16 = styled.div`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
const Font30 = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: default;
`;
const UploadButton = styled.button`
  width: 300px;
`;
