import { observable, action, makeObservable } from "mobx";

class ManageFile {
  constructor() {
    makeObservable(this);
  }

  @observable imageUrl = "";
  @observable pageIndex = 7;
  @observable fileName = "";
  @observable faceType = "역삼각형";
  @observable isFront = undefined;
  genderButtonIndex = 0;

  @action increase = (t) => {
    this.pageIndex = t;
  };
  @action decrease = () => {
    this.counter++;
  };

  @action setFaceType = (t) => {
    this.faceType = t;
    console.log("Set!");
    // console.log(`this.faceType: ${this.faceType}`)
  }

  @action setIsFront = (b) => {
    this.isFront = b;
    console.log("Set Front!");
  }
}

export default new ManageFile();
