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
  @observable ttt = 2;

  @action increase = (t) => {
    this.pageIndex = t;
  };
  @action decrease = () => {
    this.ttt = 100;
    console.log("HI");
  };

  @action setFaceType = (t) => {
    this.faceType = t;
    console.log("Set!");
    // console.log(`this.faceType: ${this.faceType}`)
  }
}

export default new ManageFile();
