# H A I !

**팀페이지 주소** -> https://kookmin-sw.github.io/capstone-2021-14

### 1. 프로젝트 소개
#### 사용자의 얼굴형을 바탕으로 Hair Style을 추천하는 서비스

최근에 다양한 헤어 스타일들이 생겨나면서 사람들은 다양한 헤어 스타일을 시도하려고 합니다. 하지만, 자신에게 어울리는 헤어 스타일을 찾기란 쉽지 않습니다. 조사에 따르면 얼굴형 별로 어울리는 헤어 스타일이 있다는 사실을 알았습니다.

실제로 사람들은 직접 자신의 얼굴형에 맞는 헤어 스타일을 찾아 머리를 꾸미기도 하고 많은 헤어 디자이너들은 고객에게 헤어 스타일을 추천할 때, 고객의 얼굴형을 참고하여 헤어 스타일을 추천하기도 합니다. 그러나, 대부분의 사람들은 자신의 얼굴형에 대해 정확히 인지하지 못하고 있고, 전문가들도 얼굴형을 정확하게 판단하는데 어려움이 있습니다.

이와 같이 사람들의 고민과 여러 사실들을 바탕으로 저희 팀은 본 프로젝트를 기획하게 되었습니다. 
본 프로젝트는 Web-Cam 캡처 또는 사진 업로드를 통해 사용자의 얼굴형을 판단하여 헤어 스타일을 추천해주는 AI기반 웹 서비스를 개발합니다.

### 2. 소개 영상

추후에 추가

### 3. 팀 소개
#### 오규석
```markdown
Student ID: 20163125
Email : cane1226@gmail.com
Role : Project manager, Front-End 개발
GitHub : https://github.com/cane21
```

#### 양성민
```markdown
Student ID: 20163124
Email : tjdals1668@kookmin.ac.kr
Role : Object Detection, 데이터 라벨링
GitHub : https://github.com/ysmin709
```

#### 유선종
```markdown
Student ID: 20163128
Email : sjongyuuu@gmail.com
Role : Object Detection, 모델 개발
GitHub : https://github.com/SeonJongYoo
```


#### 차윤성
```markdown
Student ID: 20163162
Email : vaite714@gmail.com
Role : Front-End 개발
GitHub : https://github.com/Cha-Y-S
```

#### 최나라
```markdown
Student ID: 20163163
Email : chlskfkt6810@kookmin.ac.kr
Role : Object Detection
GitHub : https://github.com/choinara0
```

### 4. 사용법
http://cha-y-s.github.io/HAI로 접속합니다.

사용자는 자신에게 어울리는 헤어 스타일을 추천 받기 위해서 사용자의 얼굴형을 판단할 수 있는 사진을 제공해야 합니다. 사진을 제공하는 두 가지 방식이 있습니다.

첫 번째는 "사진 업로드" 방식입니다. "사진 업로드" 버튼 클릭시 사용자는 "업로드" 버튼을 클릭하고 얼굴의 정면이 보이는 사진을 업로드 합니다. 

두 번째는 "Web-Cam" 방식입니다. 사용자는 Web-Cam을 통해 실시간으로 5초간 정면을 정확히 바라보면 자동으로 얼굴형을 분석합니다.

이후 사용자는 "결과 확인하기" 버튼을 클릭합니다. 그 결과 사용자의 얼굴형에 어울리는 헤어 스타일과 어울리지 않는 헤어 스타일을 추천받을 수 있습니다. 

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
      - Face-Landmark-Detection을 사용하여 출력되는 좌표를 이용한 정면 인식
    - 얼굴형 판단 모델은 아래 3가지 모델 중 학습 결과가 가장 높은 성능의 모델을 선택했습니다.
      - CNN 모델
        - Image Classification에 최적화된 신경망 사용
        - ImageNet에서 높은 성능의 모델 & 활용도가 높은 모델 조사
      - 선택 모델
        - VGGNET(VGG16) : 가장 많이 활용되는 모델로 멘토님의 조언으로 사용하게 됐습니다.
        - MobileNet V2 : FLD 모델에서 사용한 Network로 모델의 크기가 작아서 높은 성능을 가집니다.
        - Inception V3 : 얼굴형 판단 모델에 대한 논문에서 사용됩니다.
      - 학습 진행
        - Transfer Learning
 
  - Front-End
    - React
      - React-WebCam 라이브러리
    - Mobx-react

  - 데이터 라벨링
    - 데이터 수집
      - Kaggle, GitHub
    - 데이터 전처리
      - OpenCV
        - OpenCV를 사용해 사람의 얼굴 부분을 인식하여 그 부분만 잘라서 학습 데이터를 만들었습니다.
