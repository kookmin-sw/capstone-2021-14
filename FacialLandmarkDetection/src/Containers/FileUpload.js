import React from 'react'
import styled from 'styled-components'

import Container from 'Components/Container'
class FileUploadContainer extends React.Component {
  render() {
    //
    
    return (
      <Container>
        <Font16>파일을 업로드 해 주세요</Font16>
        {/* <UploadButton>업로드</UploadButton> */}
        <FileSelect onClick = {() =>
                    document.getElementById("FileInput").click()
                  }
        >
        <Font16>
          업로드
        </Font16>
        {/* <img src={fileImage} /> */}
        <input
          id="FileInput"
          type="file"
          style={{display: 'none'}}
          onChange={(e) => this.onChangeFile(e)}
        />
      </FileSelect>
      </Container>
    )
  }
}

export default FileUploadContainer

const FileSelect = styled.div`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content:center;
  outline: 0;
  border: ${(props) => (props.active ? 'solid 2px #0933b3' : 'none')};
  &:hover {
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
`


const Font16 = styled.p`
  color:black;
`
const UploadButton = styled.button`
  width:300px;
`

