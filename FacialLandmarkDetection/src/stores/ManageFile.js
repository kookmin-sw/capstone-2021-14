import { observable, action, makeObservable } from "mobx";

class ManageFile {
  constructor() {
    makeObservable(this);
  }

  @observable imageUrl = "";
  @observable pageIndex = 0;
  @observable fileName = "";
  @observable faceType = "";
  @observable genderButtonIndex = 0;
  @observable isFront = undefined;
  @observable isCapture = false;
  @observable counter = 0;

  @action increase = () => {
    this.counter++;
  }

  @action setZero = () => {
    this.counter = 0;
  }

  @action setImageUrl = (url) => {
    this.imageUrl = url;
  }

  @action setFaceType = (t) => {
    this.faceType = t;
    console.log("Set!");
    // console.log(`this.faceType: ${this.faceType}`)
  }

  @action setIsFront = (b) => {
    this.isFront = b;
    // console.log("Set Front!");
  }

  @action setIsCapture = (b) => {
    this.isCapture = b;
    console.log("isCapture!!!!!!");
  }
}

export default new ManageFile();
