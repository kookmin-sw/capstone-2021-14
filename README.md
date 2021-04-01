## 팀소개 및 페이지를 꾸며주세요.

- 프로젝트 소개
  - 프로젝트 설치방법 및 데모, 사용방법, 프리뷰등을 readme.md에 작성.
  - Api나 사용방법등 내용이 많을경우 wiki에 꾸미고 링크 추가.

- 팀페이지 꾸미기
  - 프로젝트 소개 및 팀원 소개
  - index.md 예시보고 수정.

- GitHub Pages 리파지토리 Settings > Options > GitHub Pages 
  - Source를 marster branch
  - Theme Chooser에서 태마선택
  - 수정후 팀페이지 확인하여 점검.

**팀페이지 주소** -> https://kookmin-sw.github.io/capstone-2021-14

### 1. 프로젝트 소개
#### 사용자의 얼굴형을 바탕으로 Hair Style을 추천하는 서비스

이 프로젝트는 AI 교육용 웹 서비스로서, 사용자가 별도의 설치를 하지 않고 웹 브라우저에서 간단한 AI 개념을 학습하고 테스트 할 수 있는 서비스 프로젝트입니다.

많은 헤어 디자이너들이 고객에게 머리 스타일을 추천할 때, 그 사람의 얼굴형을 참고하여 머리 스타일을 추천합니다. 하지만 많은 사람들이 자신의 얼굴형을 정확하게 알지 못하고, 헤어 전문가들도 얼굴형을 정확하게 판단할 수 없습니다.

따라서 저희는 이번 캡스톤 프로젝트에서 Web-Cam 또는 Image Upload를 통해 사용자의 얼굴형을 판단하여 Hair style을 추천해주는 AI 웹 서비스를 개발합니다.

### 2. 소개 영상

추후에 추가

### 3. 팀 소개
#### 오규석
```markdown
Student ID: 20163125
Email : cane1226@gmail.com
Role : 팀장, Project manager, Front-End 개발, 데이터 라벨링
GitHub : https://github.com/cane21
```

#### 양성민
```markdown
Student ID: 20163124
Email : tjdals1668@kookmin.ac.kr
Role : Object Detection, 데이터 수집, 데이터 라벨링
GitHub : https://github.com/ysmin709
```

#### 유선종
```markdown
Student ID: 20163128
Email : sjongyuuu@gmail.com
Role : Object Detection, 머신러닝 모델 개발, 데이터 라벨링
GitHub : https://github.com/SeonJongYoo
```


#### 차윤성
```markdown
Student ID: 20163162
Email : vaite714@gmail.com
Role : Front-End 개발, 데이터 라벨링
GitHub : https://github.com/Cha-Y-S
```

#### 최나라
```markdown
Student ID: 20163163
Email : tjdals1668@kookmin.ac.kr
Role : Object Detection, 데이터 라벨링
GitHub : https://github.com/choinara0
```

### 4. 사용법
사용자는 자신에게 어울리는 헤어 스타일을 추천 받기 위해서 사용자의 얼굴형을 판단할 수 있는 사진을 제공해야 합니다. 사진을 제공하는 두 가지 방식이 있습니다.

첫 번째는 "사진 업로드" 방식입니다. "사진 업로드" 버튼 클릭시 사용자는 "업로드" 버튼을 클릭하고 얼굴의 정면이 보이는 사진을 업로드 합니다. 

두 번째는 "Web-Cam Capture" 방식입니다. 사용자는 Web-Cam을 통해 실시간으로 자신의 모습을 캡쳐한 사진을 사용할 수 있습니다. "웹캠 사용" 버튼 클릭시 사용자는 자신의 웹캠 화면에 얼굴의 정면이 나오도록 하고 "캡처" 버튼을 클릭합니다.

마지막으로 사용자는 "결과 확인하기" 버튼을 클릭합니다. 그 결과 사용자의 얼굴형에 어울리는 헤어 스타일을 확인할 수 있습니다. 

### 5. 협업 및 개발

#### 협업
  - 버전 관리 : GitHub
  - 회의 기록 및 정리 : Trello, Notion
  - 비대면 미팅 : Google Meeting

#### 개발
  - Object Detection
    - Tensorflow.js 사용
    - 얼굴 인식 및 윤곽 인식
      - Tensorflow.js에서 제공하는 [Face-Landmarks-Detection](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection) 모델(FLD 모델) 사용
    - 얼굴형 판단 모델
      - FLD 모델의 Output을 데이터로 하여 Classification 모델 개발
 
  - Front-End
    - React
      - React-WebCam 라이브러리
    - Mobx-react

  - 데이터 라벨링
    - 데이터 수집
      - Kaggle
    - Dataframe 생성
      - Pandas
